import GuestNotFoundPage from "@/pages/not-found/not-found-page"
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

  // Fallback 404 route
  { path: "*", Component: GuestNotFoundPage },
])
