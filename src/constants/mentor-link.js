import { CgProfile } from "react-icons/cg"
import { FaTasks } from "react-icons/fa"
import { RiHome2Line } from "react-icons/ri"
import { SiGoogleclassroom } from "react-icons/si"

export const mentorLink = [
  {
    id: 1,
    name: "Dashboard",
    icon: RiHome2Line,
    href: "/mentor",
    subLinks: [],
  },
  {
    id: 2,
    name: "Profile",
    icon: CgProfile,
    href: "/mentor/profile",
    subLinks: [],
  },
  {
    id: 3,
    name: "Data Kelas",
    icon: SiGoogleclassroom,
    href: "/mentor/kelas",
    subLinks: [
      {
        id: 4,
        name: "Mentee",
        icon: SiGoogleclassroom,
        href: "/mentor/kelas/mentee",
      },
      {
        id: 5,
        name: "Absensi",
        icon: SiGoogleclassroom,
        href: "/mentor/kelas/absensi",
      },
      {
        id: 6,
        name: "Nilai",
        icon: SiGoogleclassroom,
        href: "/mentor/kelas/nilai",
      },
    ],
  },
  {
    id: 7,
    name: "Daftar Tugas",
    icon: FaTasks,
    href: "/mentor/tugas",
    subLinks: [
      {
        id: 5,
        name: "Tugas",
        icon: FaTasks,
        href: "/mentor/tugas/list",
      },
      {
        id: 6,
        name: "Laporan Akhir",
        icon: FaTasks,
        href: "/mentor/tugas/laporan-akhir",
      },
    ],
  },
]

export const sideMentorLinks = mentorLink.map((dashLink) => {
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
