import { clearUser } from "@/store/slices/user.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function useLogout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function logout() {
    dispatch(clearUser())
    navigate("/login", { replace: true })
  }

  return { logout }
}
