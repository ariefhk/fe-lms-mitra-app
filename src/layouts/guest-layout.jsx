import TopLoadingBar from "@/components/common/top-loading-bar"
import { Outlet } from "react-router-dom"

export default function GuestLayout() {
  return (
    <>
      <TopLoadingBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
