import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const menteeApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllMentee: builder.query({
      query: (args) => {
        return {
          url: `mentee?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const mentee = response?.data
        return mentee
      },
      providesTags: () => [{ type: "MENTEE", id: "LIST_OF_MENTEE" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL MENTEE: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const { useFindAllMenteeQuery } = menteeApi
