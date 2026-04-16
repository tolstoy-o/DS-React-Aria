import {
  Table as AriaTable,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
  type TableProps as AriaTableProps,
} from 'react-aria-components'
import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export interface TableColumn {
  id: string
  name: string
  isRowHeader?: boolean
  allowsSorting?: boolean
  width?: string
}

interface TableProps extends Omit<AriaTableProps, 'children'> {
  columns: TableColumn[]
  rows: Record<string, ReactNode>[]
  className?: string
}

export function Table({ columns, rows, className, ...props }: TableProps) {
  return (
    <div className={clsx('w-full overflow-x-auto rounded-lg border border-divider', className)}>
      <AriaTable className="w-full text-sm" aria-label="Data table" {...props}>
        <TableHeader className="bg-bg-base border-b border-divider">
          {columns.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              isRowHeader={col.isRowHeader}
              allowsSorting={col.allowsSorting}
              className={clsx(
                'px-4 py-3 text-left text-xs font-semibold text-text-light uppercase tracking-wide outline-none',
                'data-[allows-sorting]:cursor-pointer data-[allows-sorting]:hover:text-text-base',
                col.width,
              )}
            >
              {({ allowsSorting, sortDirection }) => (
                <div className="flex items-center gap-1">
                  {col.name}
                  {allowsSorting && (
                    <span className="opacity-50">
                      {sortDirection === 'ascending'
                        ? '↑'
                        : sortDirection === 'descending'
                        ? '↓'
                        : '↕'}
                    </span>
                  )}
                </div>
              )}
            </Column>
          ))}
        </TableHeader>
        <TableBody className="divide-y divide-divider bg-white">
          {rows.map((row, i) => (
            <Row
              key={i}
              className="hover:bg-bg-base transition-colors outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-primary/30"
            >
              {columns.map((col) => (
                <Cell key={col.id} className="px-4 py-3 text-text-base">
                  {row[col.id]}
                </Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </AriaTable>
    </div>
  )
}
