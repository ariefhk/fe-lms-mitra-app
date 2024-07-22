import { cn } from "@/lib/class-merge"
import * as React from "react"
import { Input } from "../ui/input"

const GradientInput = React.forwardRef(
  (
    {
      className,
      inputClassName,
      placeholder,
      name,
      label,
      type,
      htmlFor,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "m-4 p-[2px] rounded-full max-w-sm bg-gradient-to-r from-cyan-400  to-purple-700",
          className,
        )}>
        <label htmlFor={htmlFor} className="sr-only">
          {label}
        </label>
        <Input
          id={htmlFor}
          {...props}
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            "p-3 w-full rounded-full focus:outline-none",
            inputClassName,
          )}
        />
      </div>
    )
  },
)

GradientInput.displayName = "GradientInput"

export { GradientInput }
