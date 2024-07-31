import DashboardHeader from "@/components/common/dashboard-header"
import DashboardProfile from "@/components/common/dashboard-profile"
import { GradientButton } from "@/components/common/gradient-button"
import UpdateProfileDialog from "@/components/dialog/common/update-profile-dialog"
import useDialog from "@/hooks/useDialog"
import { getImageURL } from "@/lib/getImage"
import { getUser } from "@/store/slices/user.slice"
import { FaPencil } from "react-icons/fa6"
import { useSelector } from "react-redux"

export default function MenteeProfilePage() {
  const user = useSelector(getUser)

  const {
    isOpenDialog: isOpenUpdateProfileDialog,
    onOpenDialog: onOpenUpdateProfileDialog,
  } = useDialog()

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Profile" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col gap-y-8">
          <GradientButton
            onClick={() => onOpenUpdateProfileDialog(true)}
            className="w-[140px] text-[16px] flex gap-x-2 h-[40px] p-0"
            name="Edit Profile"
            iconClassName="w-5 h-5"
            Icon={FaPencil}
          />
          <DashboardProfile
            university={user?.university}
            major={user?.major}
            batch={user?.batch}
            name={user?.name}
            email={user?.email}
            noTelp={user?.no_telp}
            imageUrl={getImageURL(user?.profilePicture)}
          />
        </div>
      </main>
      <UpdateProfileDialog
        onClose={() => {}}
        onOpenChange={onOpenUpdateProfileDialog}
        open={isOpenUpdateProfileDialog}
        user={user}
      />
    </div>
  )
}
