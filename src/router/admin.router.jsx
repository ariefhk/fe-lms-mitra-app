import RequiredAuth from "@/components/common/required-auth"
import { ROLES } from "@/constants/roles"
import AdminLayout from "@/layouts/admin-layout"
import AdminDashboardPage from "@/pages/admin/dashboard-page"
import AdminListClassPage from "@/pages/admin/list-class-page"
import AdminListMenteePage from "@/pages/admin/list-mentee-page"
import AdminListMentorPage from "@/pages/admin/list-mentor-page"
import AdminListSeniorMentorPage from "@/pages/admin/list-senior-mentor-page"
import AdminProfilePage from "@/pages/admin/profile-page"

export const adminRouter = [
  {
    path: "/admin",
    element: <RequiredAuth allowedRoles={[ROLES.ADMIN]} />,
    children: [
      {
        path: "",
        Component: AdminLayout,
        children: [
          {
            index: true,
            Component: AdminDashboardPage,
          },
          {
            path: "profile",
            Component: AdminProfilePage,
          },
          {
            path: "kelas",
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
    ],
  },
]
