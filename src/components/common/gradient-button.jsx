import { cn } from "@/lib/class-merge"
import * as React from "react"
import { BsArrowRepeat } from "react-icons/bs"
import { Button } from "../ui/button"

const GradientButton = React.forwardRef(
  ({ name, isLoading, Icon, className, iconClassName, ...props }, ref) => {
    return (
      <Button
        {...props}
        disabled={isLoading}
        ref={ref}
        variant="plain"
        className={cn(
          "bg-color-1 rounded-full group p-0 h-0 w-0  border hover:bg-none text-white hover:text-cyan-500",
          className,
        )}>
        {isLoading && <BsArrowRepeat className="animate-spin" />}
        {Icon && !isLoading && (
          <Icon
            className={cn(
              "flex-shrink-0 w-6 h-6 text-white group-hover:text-cyan-500 ",
              iconClassName,
            )}
          />
        )}
        {name}
      </Button>
    )
  },
)
GradientButton.displayName = "Button"

export { GradientButton }
