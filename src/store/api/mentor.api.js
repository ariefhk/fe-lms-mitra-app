import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const mentorApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllMentor: builder.query({
      query: (args) => {
        return {
          url: `mentor?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const mentor = response?.data

        console.log("LOGG MENTOR: ", mentor)
        return mentor
      },
      providesTags: () => [{ type: "MENTOR", id: "LIST_OF_MENTOR" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL MENTOR: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const { useFindAllMentorQuery } = mentorApi
