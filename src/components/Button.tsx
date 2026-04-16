import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { clsx } from 'clsx'

interface ButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'h-9  px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-14 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-md transition-all cursor-pointer select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'data-[pressed]:scale-[0.98]',
        variant === 'primary' && 'bg-primary text-white hover:opacity-90',
        variant === 'secondary' &&
          'bg-white text-text-dark border border-input-border hover:bg-bg-base',
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </AriaButton>
  )
}
