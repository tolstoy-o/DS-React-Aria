import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components'
import { clsx } from 'clsx'

interface CheckboxProps extends AriaCheckboxProps {
  label?: string
}

export function Checkbox({ label, className, children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      className={clsx('flex items-center gap-2 cursor-pointer group select-none', className)}
      {...props}
    >
      {({ isSelected, isIndeterminate }) => (
        <>
          <div
            className={clsx(
              'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
              isSelected || isIndeterminate
                ? 'bg-primary border-primary'
                : 'border-input-border bg-white',
              'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-primary/30 group-data-[focus-visible]:ring-offset-1',
            )}
          >
            {isSelected && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {isIndeterminate && (
              <div className="w-2 h-0.5 bg-white rounded" />
            )}
          </div>
          <span className="text-sm text-text-base">{label ?? children}</span>
        </>
      )}
    </AriaCheckbox>
  )
}
