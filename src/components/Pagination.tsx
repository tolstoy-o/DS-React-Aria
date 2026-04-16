import { clsx } from 'clsx'

interface PaginationProps {
  page: number
  total: number
  pageSize?: number
  onChange: (page: number) => void
  className?: string
}

export function Pagination({
  page,
  total,
  pageSize = 10,
  onChange,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
    if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }

  const btnBase = 'w-9 h-9 flex items-center justify-center rounded border text-sm font-medium transition-colors'

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={clsx(btnBase, 'border-input-border text-text-base hover:bg-bg-base disabled:opacity-40 disabled:cursor-not-allowed')}
        aria-label="Previous"
      >
        ‹
      </button>

      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-text-light text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={clsx(
              btnBase,
              p === page
                ? 'bg-primary text-white border-primary'
                : 'border-input-border text-text-base hover:bg-bg-base',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={clsx(btnBase, 'border-input-border text-text-base hover:bg-bg-base disabled:opacity-40 disabled:cursor-not-allowed')}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  )
}
