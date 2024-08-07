import TopLoadingBar from "@/components/common/top-loading-bar"
import { cn } from "@/lib/class-merge"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"

export default function AuthLayout({ className }) {
  return (
    <>
      <TopLoadingBar />
      <main className={cn(className)}>
        <Outlet />
      </main>
    </>
  )
}

AuthLayout.propTypes = {
  className: PropTypes.string,
}
