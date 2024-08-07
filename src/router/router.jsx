import NotFoundPage from "@/pages/common/not-found-page"
import UnauthorizedPage from "@/pages/common/unauthorized-page"
import { createBrowserRouter } from "react-router-dom"
import { adminRouter } from "./admin.router"
import { authRouter } from "./auth.router"
import { commonRouter } from "./common.router"
import { menteeRouter } from "./mentee.router"
import { mentorRouter } from "./mentor.router"
import { seniorMentorRouter } from "./senior-mentor.router"

export const router = createBrowserRouter([
  ...commonRouter,
  ...adminRouter,
  ...seniorMentorRouter,
  ...mentorRouter,
  ...menteeRouter,
  ...authRouter,

  // Fallback 401 Unathorized route
  {
    path: "/unauthorized",
    Component: UnauthorizedPage,
  },

  // Fallback 404 route
  {
    path: "*",
    Component: NotFoundPage,
  },
])
