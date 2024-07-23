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
    findMentorBySeniorMentor: builder.query({
      query: (args) => {
        return {
          url: `mentor/senior-mentor/${args?.seniorMentorId}?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const mentor = response?.data
        return mentor
      },
      providesTags: () => [
        { type: "MENTOR", id: "LIST_OF_MENTOR_BY_SENIOR_MENTOR" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL MENTOR BY SENIOR MENTOR: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    createMentor: builder.mutation({
      query: (args) => {
        const createMentorFormData = new FormData()
        createMentorFormData.append("name", args?.name)
        createMentorFormData.append("no_telp", args?.no_telp)
        createMentorFormData.append("email", args?.email)
        createMentorFormData.append("username", args?.username)
        createMentorFormData.append("password", args?.password)
        createMentorFormData.append("seniorMentorId", args?.seniorMentorId)
        createMentorFormData.append("profilePicture", args?.profilePicture)
        return {
          url: `mentor`,
          method: "POST",
          formData: true,
          body: createMentorFormData,
        }
      },
      transformResponse: (response) => {
        const mentor = response.data
        return mentor
      },
      invalidatesTags: () => [{ type: "MENTOR", id: "LIST_OF_MENTOR" }],
    }),
    deleteMentor: builder.mutation({
      query: (args) => ({
        url: `mentor/${args?.mentorId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: () => {
        return true
      },
      invalidatesTags: () => [
        { type: "MENTOR", id: "LIST_OF_MENTOR" },
        { type: "MENTOR", id: "LIST_OF_MENTOR_BY_SENIOR_MENTOR" },
        { type: "SENIOR_MENTOR", id: "LIST_OF_SENIOR_MENTOR" },
        { type: "MENTEE", id: "LIST_OF_MENTEE" },
      ],
    }),
  }),
})

export const {
  useFindAllMentorQuery,
  useCreateMentorMutation,
  useFindMentorBySeniorMentorQuery,
  useDeleteMentorMutation,
} = mentorApi
