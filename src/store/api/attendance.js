import { hideLoading, showLoading } from "react-redux-loading-bar"
import { setAttendance } from "../slices/attendance.slice"
import { protectedApiEndpoint } from "./instance"

export const attendanceApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findWeeklyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/weekly?year=${args?.year}&month=${args?.month}&week=${args?.week}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const attendance = response?.data
        return attendance
      },
      providesTags: () => [
        { type: "ATTENDANCE", id: "LIST_OF_WEEKLY_ATTENDANCE" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL WEEKLY_ATTENDANCE: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    findDailyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/daily?date=${args?.date}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const attendance = response?.data
        return attendance
      },
      providesTags: () => [
        { type: "ATTENDANCE", id: "LIST_OF_DAILY_ATTENDANCE" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          const { data } = await queryFulfilled

          console.log(
            "LOGG DATA ON QUERYSTARTED GET ALL DAILY_ATTENDANCE: ",
            data?.attendances,
          )

          dispatch(setAttendance(data?.attendances))
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL DAILY_ATTENDANCE: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    findMenteeWeeklyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/weekly/mentee/${args?.menteeId}?year=${args?.year}&month=${args?.month}&week=${args?.week}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const attendance = response?.data
        return attendance
      },
      providesTags: () => [
        { type: "ATTENDANCE", id: "LIST_OF_MENTEE_WEEKLY_ATTENDANCE" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED FIND ALL MENTEE WEEKLY ATTENDANCE: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    findMenteeMonthlyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/monthly/mentee/${args?.menteeId}?year=${args?.year}&month=${args?.month}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const attendance = response?.data
        return attendance
      },
      providesTags: () => [
        { type: "ATTENDANCE", id: "LIST_OF_MENTEE_MONTHLY_ATTENDANCE" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED FIND ALL MENTEE MONTHLY ATTENDANCE: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    createManyAttendance: builder.mutation({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/update-attendance`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            date: args?.date,
            menteeAttendances: args?.menteeAttendances,
          },
        }
      },
      invalidatesTags: [
        { type: "ATTENDANCE", id: "LIST_OF_WEEKLY_ATTENDANCE" },
        { type: "ATTENDANCE", id: "LIST_OF_DAILY_ATTENDANCE" },
        { type: "ATTENDANCE", id: "LIST_OF_MENTEE_WEEKLY_ATTENDANCE" },
        { type: "ATTENDANCE", id: "LIST_OF_MENTEE_MONTHLY_ATTENDANCE" },
      ],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED UPDATE DAILY MENTEE ATTENDANCE: ",
            error,
          )
        }
      },
    }),
  }),
})

export const {
  useCreateManyAttendanceMutation,
  useFindDailyAttendanceQuery,
  useFindMenteeMonthlyAttendanceQuery,
  useFindMenteeWeeklyAttendanceQuery,
  useFindWeeklyAttendanceQuery,
} = attendanceApi
