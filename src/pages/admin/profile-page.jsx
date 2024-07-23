import DashboardHeader from "@/components/common/dashboard-header"
import DashboardProfile from "@/components/common/dashboard-profile"
import { getImageURL } from "@/lib/getImage"
import { getUser } from "@/store/slices/user.slice"
import { useSelector } from "react-redux"

export default function AdminProfilePage() {
  const user = useSelector(getUser)

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Profile" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col gap-y-8">
          <DashboardProfile
            name={user?.name}
            email={user?.email}
            no_telp={user?.no_telp}
            imageUrl={getImageURL(user?.profilePicture)}
          />
        </div>
      </main>
    </div>
  )
}
