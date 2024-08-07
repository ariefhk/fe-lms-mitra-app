import GuestLayout from "@/layouts/guest-layout"
import HomePage from "@/pages/common/home-page"

export const commonRouter = [
  {
    path: "/",
    Component: GuestLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]
