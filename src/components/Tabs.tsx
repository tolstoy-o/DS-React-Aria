import {
  Tabs as AriaTabs,
  TabList,
  Tab,
  TabPanel,
  type TabsProps as AriaTabsProps,
  type Key,
} from 'react-aria-components'
import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export interface TabItem {
  id: Key
  label: string
  content: ReactNode
}

interface TabsProps extends Omit<AriaTabsProps, 'children'> {
  tabs: TabItem[]
  className?: string
}

export function Tabs({ tabs, className, ...props }: TabsProps) {
  return (
    <AriaTabs className={clsx('flex flex-col', className)} {...props}>
      <TabList className="flex border-b border-divider">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium -mb-px border-b-2 cursor-pointer outline-none transition-colors',
              'text-text-light border-transparent hover:text-text-base',
              'data-[selected]:text-primary data-[selected]:border-primary',
              'data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-primary/30',
            )}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.id} id={tab.id} className="outline-none pt-4">
          {tab.content}
        </TabPanel>
      ))}
    </AriaTabs>
  )
}
