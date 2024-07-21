// import useLogout from "@/hooks/useLogout"
import useLogout from "@/hooks/useLogout"
import { LogOut } from "lucide-react"
import { GradientButton } from "./gradient-button"

export default function LogoutButton() {
  const { logout } = useLogout()

  return (
    <GradientButton
      onClick={logout}
      className="w-[140px] flex gap-x-2 h-[40px] p-0"
      name="Logout"
      Icon={LogOut}
    />
  )
}
