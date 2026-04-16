import {
  Select as AriaSelect,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
  Label,
  type SelectProps as AriaSelectProps,
  type Key,
} from 'react-aria-components'
import { clsx } from 'clsx'

export interface SelectOption {
  id: Key
  label: string
}

interface SelectProps extends Omit<AriaSelectProps<SelectOption>, 'children'> {
  label?: string
  placeholder?: string
  options: SelectOption[]
  className?: string
}

export function Select({
  label,
  placeholder = 'Select...',
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <AriaSelect className={clsx('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <Label className="text-sm font-medium text-text-dark">{label}</Label>
      )}
      <Button
        className={clsx(
          'flex items-center justify-between w-full h-10 px-3 rounded-md',
          'border border-input-border bg-white text-sm text-text-dark text-left cursor-pointer outline-none',
          'hover:border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/20',
          'data-[pressed]:border-primary transition-shadow',
        )}
      >
        <SelectValue className="data-[placeholder]:text-text-light flex-1 truncate">
          {({ selectedText }) => selectedText || placeholder}
        </SelectValue>
        <svg className="w-4 h-4 text-text-light flex-shrink-0 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </Button>
      <Popover className="w-[--trigger-width] bg-white rounded-md border border-divider shadow-lg overflow-hidden z-50">
        <ListBox className="p-1 max-h-64 overflow-auto outline-none">
          {options.map((opt) => (
            <ListBoxItem
              key={opt.id}
              id={opt.id}
              textValue={opt.label}
              className={clsx(
                'px-3 py-2 rounded text-sm text-text-dark cursor-pointer outline-none transition-colors',
                'hover:bg-bg-base focus:bg-bg-base',
                'data-[selected]:text-primary data-[selected]:font-medium data-[selected]:bg-primary/5',
              )}
            >
              {opt.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}
