import MenteeLayout from "@/layouts/common/mentee-layout"
import MenteeDashboardPage from "@/pages/mentee/dashboard-page"
import MenteeInformasiAbsensiPage from "@/pages/mentee/informasi-absensi-page"
import MenteeInformasiNilaiPage from "@/pages/mentee/informasi-nilai-page"
import MenteeListLaporanAkhirPage from "@/pages/mentee/list-laporan-akhir-page"
import MenteeListTugasPage from "@/pages/mentee/list-tugas-page"
import MenteeProfilePage from "@/pages/mentee/profile-page"
import MenteeTugasDetailPage from "@/pages/mentee/tugas-detail-page"

export const menteeRouter = [
  {
    path: "/mentee",
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
            path: "laporan-akhir",
            Component: MenteeListLaporanAkhirPage,
          },
        ],
      },
    ],
  },
]
