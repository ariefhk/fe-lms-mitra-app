import { cn } from "@/lib/class-merge"
import * as React from "react"
import { BsArrowRepeat } from "react-icons/bs"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const GradientLink = React.forwardRef(
  (
    {
      name,
      to,
      isLoading,
      isDisabled,
      Icon,
      className,
      iconClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        {...props}
        disabled={isLoading || isDisabled}
        ref={ref}
        variant="plain"
        asChild
        className={cn(
          "bg-color-1 rounded-lg group p-0 h-0 w-0  border hover:bg-none text-white hover:text-cyan-500",
          className,
        )}>
        <Link to={to}>
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
        </Link>
      </Button>
    )
  },
)
GradientLink.displayName = "GradientLink"

export { GradientLink }
