import DashboardNav from "@/components/common/dashboard-nav"
import TopLoadingBar from "@/components/common/top-loading-bar"
import { SENIOR_MENTOR_LINK } from "@/constants/link/senior-mentor-link"
import { Outlet } from "react-router-dom"

export default function SeniorMentorLayout() {
  return (
    <>
      <TopLoadingBar />
      <div className="flex h-screen font-poppins flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64 h-full hidden md:block ">
          <DashboardNav dashLinks={SENIOR_MENTOR_LINK} />
        </div>
        <div className="flex-grow md:overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}
