import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type SelectRootProps = React.ComponentProps<typeof Select>

export interface FormSelectOption {
  value: string
  label: React.ReactNode
}

export interface FormSelectProps extends Omit<SelectRootProps, "children"> {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  placeholder?: string
  options: FormSelectOption[]
  className?: string
  containerClassName?: string
  labelClassName?: string
  triggerClassName?: string
}

const FormSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  FormSelectProps
>(function FormSelect(
  {
    id,
    label,
    description,
    error,
    placeholder,
    options,
    disabled,
    required,
    className,
    containerClassName,
    labelClassName,
    triggerClassName,
    ...selectProps
  },
  ref,
) {
  const descriptionId = description ? `${id}-description` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined
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
      <Select disabled={disabled} required={required} {...selectProps}>
        <SelectTrigger
          ref={ref}
          id={id}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-auto w-full rounded-[12px] px-3 py-2 text-sm font-normal",
            "bg-form-input-bg text-foreground",
            "border border-form-input-border transition-colors",
            "hover:border-form-input-border-focus",
            "focus-visible:border-form-input-border-focus focus-visible:ring-2 focus-visible:ring-form-input-border-focus/30",
            "disabled:pointer-events-none disabled:opacity-50",
            "aria-invalid:border-form-input-error",
            "aria-invalid:focus-visible:border-form-input-error aria-invalid:focus-visible:ring-form-input-error/30",
            "data-placeholder:text-muted-foreground",
            triggerClassName,
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && !hasError ? (
        <p
          id={descriptionId}
          className="text-xs font-normal text-muted-foreground"
        >
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p id={errorId} className="text-xs font-normal text-form-input-error">
          {error}
        </p>
      ) : null}
    </div>
  )
})

export { FormSelect }
