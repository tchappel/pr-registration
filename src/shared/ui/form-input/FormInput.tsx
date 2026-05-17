import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type NativeInputProps = Omit<React.ComponentProps<"input">, "id">

export interface FormInputProps extends NativeInputProps {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  className?: string
  containerClassName?: string
  labelClassName?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      id,
      label,
      description,
      error,
      disabled,
      required,
      className,
      containerClassName,
      labelClassName,
      "aria-describedby": ariaDescribedByProp,
      ...inputProps
    },
    ref,
  ) {
    const descriptionId = description ? `${id}-description` : undefined
    const errorId = error ? `${id}-error` : undefined
    const describedBy =
      [ariaDescribedByProp, descriptionId, errorId].filter(Boolean).join(" ") ||
      undefined
    const hasError = Boolean(error)

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5 font-sans",
          disabled && "opacity-50",
          containerClassName,
        )}
        data-disabled={disabled || undefined}
      >
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-foreground",
            labelClassName,
          )}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-form-input-error">
              *
            </span>
          ) : null}
        </Label>
        <Input
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-auto rounded-[12px] px-3 py-2 text-sm font-normal",
            "bg-form-input-bg text-foreground placeholder:text-muted-foreground",
            "border border-form-input-border transition-colors",
            "hover:border-form-input-border-focus",
            "focus-visible:border-form-input-border-focus focus-visible:ring-2 focus-visible:ring-form-input-border-focus/30",
            "disabled:pointer-events-none disabled:opacity-50",
            "aria-invalid:border-form-input-error",
            "aria-invalid:focus-visible:border-form-input-error aria-invalid:focus-visible:ring-form-input-error/30",
            "md:text-sm",
            className,
          )}
          {...inputProps}
        />
        {description && !hasError ? (
          <p
            id={descriptionId}
            className="text-xs font-normal text-muted-foreground"
          >
            {description}
          </p>
        ) : null}
        {hasError ? (
          <p
            id={errorId}
            className="text-xs font-normal text-form-input-error"
          >
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

export { FormInput }
