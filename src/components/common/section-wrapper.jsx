import { cn } from "@/lib/class-merge"
import PropTypes from "prop-types"

export default function SectionWrapper({ className, children }) {
  return (
    <div
      className={cn(
        " max-w-screen-xl w-full mx-auto  px-5 md:px-8",
        className,
      )}>
      {children}
    </div>
  )
}

SectionWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
