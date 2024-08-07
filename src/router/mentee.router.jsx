import RequiredAuth from "@/components/common/required-auth"
import { ROLES } from "@/constants/roles"
import MenteeLayout from "@/layouts/mentee-layout"
import MenteeDashboardPage from "@/pages/mentee/dashboard-page"
import MenteeInformasiAbsensiPage from "@/pages/mentee/informasi-absensi-page"
import MenteeInformasiNilaiPage from "@/pages/mentee/informasi-nilai-page"
import MenteeFinalReportDetailPage from "@/pages/mentee/laporan-akhir-detail-page"
import MenteeListLaporanAkhirPage from "@/pages/mentee/list-laporan-akhir-page"
import MenteeListTugasPage from "@/pages/mentee/list-tugas-page"
import MenteeProfilePage from "@/pages/mentee/profile-page"
import MenteeTugasDetailPage from "@/pages/mentee/tugas-detail-page"

export const menteeRouter = [
  {
    path: "/mentee",
    element: <RequiredAuth allowedRoles={[ROLES.MENTEE]} />,
    children: [
      {
        path: "",
        Component: MenteeLayout,
        children: [
          {
            index: true,
            Component: MenteeDashboardPage,
          },
          {
            path: "profile",
            Component: MenteeProfilePage,
          },
          {
            path: "informasi",
            children: [
              {
                path: "absensi",
                Component: MenteeInformasiAbsensiPage,
              },
              {
                path: "nilai",
                Component: MenteeInformasiNilaiPage,
              },
            ],
          },
          {
            path: "tugas",
            children: [
              {
                index: true,
                Component: MenteeListTugasPage,
              },
              {
                path: ":assignmentId",
                Component: MenteeTugasDetailPage,
              },
              {
                path: ":assignmentId/laporan-akhir",
                Component: MenteeFinalReportDetailPage,
              },
              {
                path: "laporan-akhir",
                Component: MenteeListLaporanAkhirPage,
              },
            ],
          },
        ],
      },
    ],
  },
]
