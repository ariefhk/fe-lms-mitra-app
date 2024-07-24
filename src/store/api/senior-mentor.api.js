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
    updateSeniorMentor: builder.mutation({
      query: (args) => {
        const updateSeniorMentorFormData = new FormData()
        updateSeniorMentorFormData.append("name", args?.name)
        updateSeniorMentorFormData.append("no_telp", args?.no_telp)
        updateSeniorMentorFormData.append("email", args?.email)
        updateSeniorMentorFormData.append("username", args?.username)
        updateSeniorMentorFormData.append("password", args?.password)
        updateSeniorMentorFormData.append(
          "profilePicture",
          args?.profilePicture,
        )
        return {
          url: `senior-mentor/${args?.seniorMentorId}`,
          method: "PUT",
          formData: true,
          body: updateSeniorMentorFormData,
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
    deleteSeniorMentor: builder.mutation({
      query: (args) => ({
        url: `senior-mentor/${args?.seniorMentorId}`,
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
  useFindAllSeniorMentorQuery,
  useCreateSeniorMentorMutation,
  useDeleteSeniorMentorMutation,
  useUpdateSeniorMentorMutation,
} = seniorMentorApi
