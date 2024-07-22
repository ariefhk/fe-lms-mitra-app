import DashboardHeader from "@/components/common/dashboard-header"
import DashboardProfile from "@/components/common/dashboard-profile"
import { GradientButton } from "@/components/common/gradient-button"
import { FaPencil } from "react-icons/fa6"

export default function AdminProfilePage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Profile" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col gap-y-8">
          <GradientButton
            className="w-[140px] text-[16px] flex gap-x-2 h-[40px] p-0"
            name="Edit Profile"
            iconClassName="w-5 h-5"
            Icon={FaPencil}
          />
          <DashboardProfile
            name={"Arief Rachman Hakim"}
            email={"arief@gmail.com"}
            no_telp={"097472672362"}
            senior_mentor={"Arief"}
            imageUrl={"/images/person-placeholder.svg"}
          />
        </div>
      </main>
    </div>
  )
}
