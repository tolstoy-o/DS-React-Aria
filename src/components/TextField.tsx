import {
  TextField as AriaTextField,
  Label,
  Input,
  FieldError,
  Text,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components'
import { clsx } from 'clsx'

interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string
  className?: string
}

export function TextField({
  label,
  placeholder,
  description,
  errorMessage,
  className,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField className={clsx('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <Label className="text-sm font-medium text-text-dark">{label}</Label>
      )}
      <Input
        placeholder={placeholder}
        className={clsx(
          'w-full h-10 px-3 rounded-md border border-input-border bg-white text-text-dark text-sm',
          'placeholder:text-text-light outline-none transition-shadow',
          'focus:border-primary focus:ring-2 focus:ring-primary/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'data-[invalid]:border-fail data-[invalid]:ring-fail/20',
        )}
      />
      {description && (
        <Text slot="description" className="text-xs text-text-light">
          {description}
        </Text>
      )}
      {errorMessage && (
        <FieldError className="text-xs text-fail">{errorMessage}</FieldError>
      )}
    </AriaTextField>
  )
}
