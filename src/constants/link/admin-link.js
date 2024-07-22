import { CgProfile } from "react-icons/cg"
import { FaUsers } from "react-icons/fa"
import { RiHome2Line } from "react-icons/ri"
import { SiGoogleclassroom } from "react-icons/si"

export const ADMIN_LINK = [
  {
    id: 1,
    name: "Dashboard",
    icon: RiHome2Line,
    href: "/admin",
    subLinks: [],
  },
  {
    id: 2,
    name: "Profile",
    icon: CgProfile,
    href: "/admin/profile",
    subLinks: [],
  },
  {
    id: 3,
    name: "Data Kelas",
    icon: SiGoogleclassroom,
    href: "/admin/kelas",
    subLinks: [],
  },
  {
    id: 4,
    name: "Data User",
    icon: FaUsers,
    href: "/admin/user",
    subLinks: [
      {
        id: 5,
        name: "Senior Mentor",
        icon: FaUsers,
        href: "/admin/user/senior-mentor",
      },
      {
        id: 6,
        name: "Mentor",
        icon: FaUsers,
        href: "/admin/user/mentor",
      },
      {
        id: 7,
        name: "Mentee",
        icon: FaUsers,
        href: "/admin/user/mentee",
      },
    ],
  },
]

export const SIDE_ADMIN_LINK = ADMIN_LINK.map((dashLink) => {
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
