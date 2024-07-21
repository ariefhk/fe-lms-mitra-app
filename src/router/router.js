import GuestNotFoundPage from "@/pages/not-found/not-found-page"
import { createBrowserRouter } from "react-router-dom"
import { adminRouter } from "./admin.router"
import { menteeRouter } from "./mentee.router"
import { mentorRouter } from "./mentor.router"
import { seniorMentorRouter } from "./senior-mentor.router"

export const router = createBrowserRouter([
  ...adminRouter,
  ...seniorMentorRouter,
  ...mentorRouter,
  ...menteeRouter,

  // Fallback 404 route
  { path: "*", Component: GuestNotFoundPage },
])
