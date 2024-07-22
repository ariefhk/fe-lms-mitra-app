import { CgProfile } from "react-icons/cg"
import { FaInfoCircle, FaTasks } from "react-icons/fa"
import { RiHome2Line } from "react-icons/ri"

export const MENTEE_LINK = [
  {
    id: 1,
    name: "Dashboard",
    icon: RiHome2Line,
    href: "/mentee",
    subLinks: [],
  },
  {
    id: 2,
    name: "Profile",
    icon: CgProfile,
    href: "/mentee/profile",
    subLinks: [],
  },
  {
    id: 3,
    name: "Informasi",
    icon: FaInfoCircle,
    href: "/mentee/informasi",
    subLinks: [
      {
        id: 4,
        name: "Mentee",
        icon: FaInfoCircle,
        href: "/mentee/informasi/absensi",
      },
      {
        id: 5,
        name: "Nilai",
        icon: FaInfoCircle,
        href: "/mentee/informasi/nilai",
      },
    ],
  },
  {
    id: 6,
    name: "Daftar Tugas",
    icon: FaTasks,
    href: "/mentee/tugas",
    subLinks: [
      {
        id: 7,
        name: "Tugas",
        icon: FaTasks,
        href: "/mentee/tugas/list",
      },
      {
        id: 8,
        name: "Laporan Akhir",
        icon: FaTasks,
        href: "/mentee/tugas/laporan-akhir",
      },
    ],
  },
]

export const SIDE_MENTEE_LINK = MENTEE_LINK.map((dashLink) => {
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
