import { CgProfile } from "react-icons/cg"
import { FaUsers } from "react-icons/fa"
import { RiHome2Line } from "react-icons/ri"

export const SENIOR_MENTOR_LINK = [
  {
    id: 1,
    name: "Dashboard",
    icon: RiHome2Line,
    href: "/senior-mentor",
    subLinks: [],
  },
  {
    id: 2,
    name: "Profile",
    icon: CgProfile,
    href: "/senior-mentor/profile",
    subLinks: [],
  },
  {
    id: 3,
    name: "Mentor",
    icon: FaUsers,
    href: "/senior-mentor/mentor",
    subLinks: [],
  },
]

export const SIDE_SENIOR_MENTOR_LINK = SENIOR_MENTOR_LINK.map((dashLink) => {
  if (dashLink.subLinks.length > 0) {
    return {
      ...dashLink,
      id: dashLink.id + 100,
      subLinks: dashLink.subLinks.map((subLink) => {
        return {
          ...subLink,
          id: subLink.id + 100,
        }
      }),
    }
  }

  return {
    ...dashLink,
    id: dashLink.id + 100,
  }
})
