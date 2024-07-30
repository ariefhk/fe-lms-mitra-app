// import useLogout from "@/hooks/useLogout"
import useLogout from "@/hooks/useLogout"
import { useLogoutMutation } from "@/store/api/user.api"
import { LogOut } from "lucide-react"
import { GradientButton } from "./gradient-button"

export default function LogoutButton() {
  const { logout } = useLogout()
  const [logoutUser] = useLogoutMutation()

  async function onLogout() {
    try {
      await logoutUser().unwrap()
      logout()
    } catch (error) {
      logout() // logout in client side even if the request failed
      console.log("ERRO ON LOGOUT", error)
    }
  }

  return (
    <GradientButton
      onClick={async () => {
        await onLogout()
      }}
      className="w-[140px] rounded-full flex gap-x-2 h-[40px] p-0"
      name="Logout"
      Icon={LogOut}
    />
  )
}
