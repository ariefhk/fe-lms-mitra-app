// import { AUTH_KEY } from "@/constants/localstorage-key"
import { LOCALSTORAGE } from "@/constants/localstorage-key"
import { getLocalStorageData } from "@/lib/localstorage"
import PropTypes from "prop-types"
import { Navigate, Outlet } from "react-router-dom"

export default function RequiredAuth({ allowedRoles }) {
  const user = getLocalStorageData(LOCALSTORAGE.USER)
  const isAllowed = !allowedRoles.length || allowedRoles.includes(user?.role)

  if (isAllowed) {
    return <Outlet />
  } else if (user?.role) {
    return <Navigate to="/unauthorized" replace />
  } else {
    return <Navigate to="/login" replace />
  }
}

RequiredAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
}
