import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const seniorMentorApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllSeniorMentor: builder.query({
      query: (args) => {
        return {
          url: `senior-mentor?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const seniorMentor = response?.data
        return seniorMentor
      },
      providesTags: () => [
        { type: "SENIOR_MENTOR", id: "LIST_OF_SENIOR_MENTOR" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL SENIOR_MENTOR: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),

    createSeniorMentor: builder.mutation({
      query: (args) => {
        const createSeniorMentorFormData = new FormData()
        createSeniorMentorFormData.append("name", args?.name)
        createSeniorMentorFormData.append("no_telp", args?.no_telp)
        createSeniorMentorFormData.append("email", args?.email)
        createSeniorMentorFormData.append("username", args?.username)
        createSeniorMentorFormData.append("password", args?.password)
        createSeniorMentorFormData.append(
          "profilePicture",
          args?.profilePicture,
        )
        return {
          url: `senior-mentor`,
          method: "POST",
          formData: true,
          body: createSeniorMentorFormData,
        }
      },
      transformResponse: (response) => {
        const seniorMentor = response.data
        return seniorMentor
      },
      invalidatesTags: () => [
        { type: "SENIOR_MENTOR", id: "LIST_OF_SENIOR_MENTOR" },
      ],
    }),
  }),
})

export const { useFindAllSeniorMentorQuery, useCreateSeniorMentorMutation } =
  seniorMentorApi
