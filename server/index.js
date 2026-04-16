import express  from 'express'
import axios    from 'axios'
import * as cheerio from 'cheerio'

const app = express()
app.use(express.json())
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// ─── Color helpers ────────────────────────────────────────────────────────────

function hexExpand(hex) {
  hex = hex.replace('#', '').toLowerCase()
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  if (hex.length === 4) hex = hex.slice(0,3).split('').map(c=>c+c).join('') + hex.slice(3).repeat(2)
  return hex.length >= 6 ? hex.slice(0, 6) : null
}

function rgbToHex(r, g, b) {
  return '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('')
}

function hslToRgb(h, s, l) {
  if (s === 0) { const v = Math.round(l*255); return {r:v,g:v,b:v} }
  const q = l < 0.5 ? l*(1+s) : l+s-l*s, p = 2*l-q
  const hue2 = t => {
    if (t<0) t+=1; if (t>1) t-=1
    if (t<1/6) return p+(q-p)*6*t
    if (t<1/2) return q
    if (t<2/3) return p+(q-p)*(2/3-t)*6
    return p
  }
  return { r:Math.round(hue2(h/360+1/3)*255), g:Math.round(hue2(h/360)*255), b:Math.round(hue2(h/360-1/3)*255) }
}

function rgbToHsl(r, g, b) {
  r/=255; g/=255; b/=255
  const max=Math.max(r,g,b), min=Math.min(r,g,b)
  let h=0,s=0,l=(max+min)/2
  if (max!==min) {
    const d=max-min
    s = l>0.5 ? d/(2-max-min) : d/(max+min)
    switch(max) {
      case r: h=((g-b)/d+(g<b?6:0))*60; break
      case g: h=((b-r)/d+2)*60; break
      case b: h=((r-g)/d+4)*60; break
    }
  }
  return {h,s,l}
}

function parseColor(str) {
  if (!str) return null
  str = str.trim().toLowerCase()
  if (str.startsWith('#')) {
    const hex = hexExpand(str)
    if (!hex) return null
    return { r:parseInt(hex.slice(0,2),16), g:parseInt(hex.slice(2,4),16), b:parseInt(hex.slice(4,6),16), hex:'#'+hex }
  }
  const rgb = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgb) { const r=+rgb[1],g=+rgb[2],b=+rgb[3]; return {r,g,b,hex:rgbToHex(r,g,b)} }
  const hsl = str.match(/hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/)
  if (hsl) { const {r,g,b}=hslToRgb(+hsl[1],+hsl[2]/100,+hsl[3]/100); return {r,g,b,hex:rgbToHex(r,g,b)} }
  return null
}

const isNeutral = ({r,g,b}) => { const {s,l}=rgbToHsl(r,g,b); return s<0.12||l>0.93||l<0.06 }

function colorDistance(h1, h2) {
  const p1=parseColor(h1), p2=parseColor(h2)
  if (!p1||!p2) return Infinity
  return Math.sqrt((p1.r-p2.r)**2+(p1.g-p2.g)**2+(p1.b-p2.b)**2)
}

function dedupe(arr) {
  const r=[]
  for (const h of arr) if (!r.some(e=>colorDistance(e,h)<30)) r.push(h)
  return r
}

function hueCategory(r,g,b) {
  const {h,s}=rgbToHsl(r,g,b)
  if (s<0.15) return null
  if (h<=20||h>=340) return 'error'
  if (h>=85&&h<=165) return 'success'
  if (h>=195&&h<=270) return 'link'
  return 'primary'
}

const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\s*\(\s*\d+[^)]*\)|hsla?\s*\([^)]+\)/g
const extractAllColors = text => (text.match(COLOR_RE)||[])

function analyzeCSS(css) {
  const score = { primary:new Map(), link:new Map(), success:new Map(), error:new Map() }
  const add = (cat,hex,pts) => { if(hex) score[cat].set(hex,(score[cat].get(hex)||0)+pts) }

  // 1. CSS variables
  const varRe = /--(\w[\w-]*)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\s*\([^)]+\)|hsla?\s*\([^)]+\))/g
  let m
  while ((m=varRe.exec(css))!==null) {
    const n=m[1].toLowerCase(), p=parseColor(m[2])
    if (!p||isNeutral(p)) continue
    if (/primary|brand|main|accent/.test(n))                    add('primary',p.hex,20)
    if (/\blink|anchor/.test(n))                                add('link',p.hex,20)
    if (/success|positive|confirm/.test(n))                     add('success',p.hex,20)
    if (/error|danger|fail|negative|destructive/.test(n))       add('error',p.hex,20)
  }

  // 2. Selectors
  const ruleRe = /([^{}@][^{]*)\{([^}]*)\}/g
  while ((m=ruleRe.exec(css))!==null) {
    const sel=m[1].trim().toLowerCase(), decl=m[2]
    const colors=extractAllColors(decl).map(c=>parseColor(c)).filter(c=>c&&!isNeutral(c))
    if (!colors.length) continue
    const isColor=/\bcolor\s*:(?!.*background)/.test(decl)
    const isBg=/background(-color)?\s*:/.test(decl)
    for (const p of colors) {
      if (/^\s*a\s*$|^a[^a-z]/.test(sel)&&isColor)            add('link',p.hex,8)
      if (/success|\.valid|\.positive/.test(sel))              add('success',p.hex,8)
      if (/error|\.invalid|\.danger|\.fail/.test(sel))        add('error',p.hex,8)
      if (/btn-primary|\.primary\b/.test(sel)&&isBg)           add('primary',p.hex,8)
    }
  }

  // 3. Heuristic fallback
  const freq=new Map()
  for (const c of extractAllColors(css)) { const p=parseColor(c); if(p&&!isNeutral(p)) freq.set(p.hex,(freq.get(p.hex)||0)+1) }
  for (const [cat,map] of Object.entries(score)) {
    if (map.size>0) continue
    for (const [hex,f] of freq) { const p=parseColor(hex); if(p&&hueCategory(p.r,p.g,p.b)===cat) add(cat,hex,f) }
  }

  const result={}
  for (const [cat,map] of Object.entries(score)) {
    result[cat]=dedupe([...map.entries()].sort((a,b)=>b[1]-a[1]).map(([h])=>h)).slice(0,3)
  }
  return result
}

// ─── Routes ───────────────────────────────────────────────────────────────────

app.post('/api/extract', async (req,res) => {
  try {
    let { url } = req.body
    if (!url?.trim()) return res.status(400).json({error:'URL is required'})
    if (!/^https?:\/\//i.test(url)) url='https://'+url
    const origin = new URL(url).origin
    const headers = { 'User-Agent':'Mozilla/5.0 (compatible)', 'Accept':'text/html' }

    const {data:html} = await axios.get(url,{timeout:12000,headers})
    const $ = cheerio.load(html)
    let css=''

    $('style').each((_,el)=>{css+=$(el).html()+'\n'})

    const links=[]
    $('link[rel="stylesheet"]').each((_,el)=>{ const h=$(el).attr('href'); if(h) links.push(h) })

    const resolve=h=>{
      if (/^https?:\/\//i.test(h)) return h
      if (h.startsWith('//')) return 'https:'+h
      if (h.startsWith('/')) return origin+h
      return origin+'/'+h
    }

    await Promise.all(links.slice(0,8).map(async h=>{
      try { const {data}=await axios.get(resolve(h),{timeout:6000,headers,responseType:'text'}); css+=data+'\n' }
      catch{}
    }))

    if (!css.trim()) return res.status(422).json({error:'No CSS found on this page'})
    res.json({colors:analyzeCSS(css)})
  } catch(err) {
    const status=err.code==='ENOTFOUND'?400:500
    res.status(status).json({error:err.message})
  }
})

app.post('/api/push', async (req,res) => {
  try {
    const {token,owner,repo,filePath,content}=req.body
    if (!token||!owner||!repo||!filePath||!content)
      return res.status(400).json({error:'Missing required fields'})

    const headers = {
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json',
      'Accept':'application/vnd.github+json',
      'X-GitHub-Api-Version':'2022-11-28',
    }
    const fileUrl=`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`

    let sha
    try { const {data}=await axios.get(fileUrl,{headers}); sha=data.sha }
    catch(e){ if(e.response?.status!==404) throw e }

    const body={message:'chore: update partner theme via Color Extractor',content:Buffer.from(content).toString('base64')}
    if (sha) body.sha=sha

    const {data}=await axios.put(fileUrl,body,{headers})
    res.json({success:true,commitUrl:data.commit?.html_url})
  } catch(err) {
    res.status(500).json({error:err.response?.data?.message||err.message})
  }
})

app.listen(3458, () => console.log('API server → http://localhost:3458'))
