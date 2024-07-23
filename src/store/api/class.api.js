import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const classApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllClass: builder.query({
      query: (args) => {
        return {
          url: `class?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const classes = response?.data
        return classes
      },
      providesTags: () => [{ type: "CLASS", id: "LIST_OF_CLASS" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL CLASS: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    createClass: builder.mutation({
      query: (args) => ({
        url: `class`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: args?.name,
          description: args?.descrition,
          mentorId: args?.mentorId,
        },
      }),
      transformResponse: (response) => {
        const classes = response.data
        return classes
      },
      invalidatesTags: () => [{ type: "CLASS", id: "LIST_OF_CLASS" }],
    }),
  }),
})

export const { useFindAllClassQuery, useCreateClassMutation } = classApi
