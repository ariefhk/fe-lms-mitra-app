import AuthLayout from "@/layouts/auth-layout"
import LoginPage from "@/pages/auth/login-page"

export const authRouter = [
  {
    path: "/login",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
    ],
  },
]
