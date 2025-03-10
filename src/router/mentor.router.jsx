import RequiredAuth from "@/components/common/required-auth"
import { ROLES } from "@/constants/roles"
import MentorLayout from "@/layouts/mentor-layout"
import MentorCreatePresencePage from "@/pages/mentor/create-presence-page"
import MentorDashboardPage from "@/pages/mentor/dashboard-page"
import MentorListAbsensiPage from "@/pages/mentor/list-absensi-page"
import MentorListAssignment from "@/pages/mentor/list-assignment-page"
import MentorListFinalAsignment from "@/pages/mentor/list-final-assignment"
import MentorListMenteeNilaiDetailPage from "@/pages/mentor/list-mentee-nilai-detail-page"
import MentorListMenteeNilaiPage from "@/pages/mentor/list-mentee-nilai-page"
import MentorListMenteePage from "@/pages/mentor/list-mentee-page"
import MentorProfilePage from "@/pages/mentor/profile-page"

export const mentorRouter = [
  {
    path: "/mentor",
    element: <RequiredAuth allowedRoles={[ROLES.MENTOR]} />,
    children: [
      {
        path: "",
        Component: MentorLayout,
        children: [
          {
            index: true,
            Component: MentorDashboardPage,
          },
          {
            path: "profile",
            Component: MentorProfilePage,
          },
          {
            path: "kelas",
            children: [
              {
                path: "mentee",
                Component: MentorListMenteePage,
              },
              {
                path: "absensi",
                Component: MentorListAbsensiPage,
              },
              {
                path: "absensi/:classId/buat",
                Component: MentorCreatePresencePage,
              },
              {
                path: "nilai",
                Component: MentorListMenteeNilaiPage,
              },
              {
                path: "nilai/:menteeId",
                Component: MentorListMenteeNilaiDetailPage,
              },
            ],
          },
          {
            path: "tugas",
            children: [
              {
                path: "list",
                Component: MentorListAssignment,
              },
              {
                path: "laporan-akhir",
                Component: MentorListFinalAsignment,
              },
            ],
          },
        ],
      },
    ],
  },
]
