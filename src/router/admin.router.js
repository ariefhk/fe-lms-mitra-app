import AdminDashboardPage from "@/pages/admin/dashboard-page"
import AdminListClassPage from "@/pages/admin/list-class-page"
import AdminListMenteePage from "@/pages/admin/list-mentee-page"
import AdminListMentorPage from "@/pages/admin/list-mentor-page"
import AdminListSeniorMentorPage from "@/pages/admin/list-senior-mentor-page"

export const adminRouter = [
  {
    path: "/admin",
    children: [
      {
        index: true,
        Component: AdminDashboardPage,
      },
      {
        path: "class",
        Component: AdminListClassPage,
      },
      {
        path: "user",
        children: [
          {
            path: "senior-mentor",
            Component: AdminListSeniorMentorPage,
          },
          {
            path: "mentor",
            Component: AdminListMentorPage,
          },
          {
            path: "mentee",
            Component: AdminListMenteePage,
          },
        ],
      },
    ],
  },
]
