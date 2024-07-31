import DashboardHeader from "@/components/common/dashboard-header"
import { GradientLink } from "@/components/common/gradient-link"
import { CgProfile } from "react-icons/cg"
import { FaInfoCircle, FaTasks } from "react-icons/fa"

export default function MenteeDashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Dashboard Mentee" />
      <main className="flex flex-1 flex-col items-center gap-4  p-4 lg:gap-8 lg:p-6">
        <h1 className="text-txt24_36  text-color-4 font-semibold">
          Selamat Datang di Halaman Utama MDP
        </h1>
        <div className="flex items-center gap-x-10">
          <GradientLink
            to={"/mentee/profile"}
            className="w-[200px] rounded-lg text-[18px]   flex gap-x-5 h-[70px] p-0"
            iconClassName="w-8 h-8"
            name="Profile"
            Icon={CgProfile}
          />
          <GradientLink
            to={"/mentee/informasi/absensi"}
            className="w-[220px] rounded-lg text-[18px]   flex gap-x-5 h-[70px] p-0"
            iconClassName="w-8 h-8"
            name="Informasi"
            Icon={FaInfoCircle}
          />
          <GradientLink
            to={"/mentee/tugas"}
            className="w-[240px] rounded-lg  text-[18px]   flex gap-x-5 h-[70px] p-0"
            iconClassName="w-8 h-8"
            name="Daftar Tugas"
            Icon={FaTasks}
          />
        </div>
      </main>
    </div>
  )
}
