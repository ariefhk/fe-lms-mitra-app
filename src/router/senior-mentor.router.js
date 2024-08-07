import SeniorMentorLayout from "@/layouts/senior-mentor-layout"
import SeniorMentorDashboardPage from "@/pages/senior-mentor/dashboard-page"
import SeniorMentorListMentorPage from "@/pages/senior-mentor/list-mentor"
import SeniorMentorProfilePage from "@/pages/senior-mentor/profile-page"

export const seniorMentorRouter = [
  {
    path: "/senior-mentor",
    Component: SeniorMentorLayout,
    children: [
      {
        index: true,
        Component: SeniorMentorDashboardPage,
      },
      {
        path: "profile",
        Component: SeniorMentorProfilePage,
      },
      {
        path: "mentor",
        Component: SeniorMentorListMentorPage,
      },
    ],
  },
]
