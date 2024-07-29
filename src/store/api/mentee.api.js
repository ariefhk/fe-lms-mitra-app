import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const menteeApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findMenteeById: builder.query({
      query: (args) => {
        return {
          url: `mentee/${args?.menteeId}`,
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
      providesTags: () => [{ type: "MENTEE", id: "MENTEE_BY_ID" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET MENTEE BY ID: ", error)
        }
        dispatch(hideLoading())
      },
    }),
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
    findAllMenteeByClass: builder.query({
      query: (args) => {
        return {
          url: `mentee/class/${args?.classId}?name=${args.name}`,
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
      providesTags: () => [
        { type: "MENTEE", id: "LIST_OF_MENTEE_BY_CLASS_ID" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL MENTEE BY CLASS: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    createMentee: builder.mutation({
      query: (args) => {
        const createMenteeFormData = new FormData()
        createMenteeFormData.append("name", args?.name)
        createMenteeFormData.append("no_telp", args?.no_telp)
        createMenteeFormData.append("batch", args?.batch)
        createMenteeFormData.append("major", args?.major)
        createMenteeFormData.append("university", args?.university)
        createMenteeFormData.append("classId", args?.classId)
        createMenteeFormData.append("email", args?.email)
        createMenteeFormData.append("username", args?.username)
        createMenteeFormData.append("password", args?.password)
        createMenteeFormData.append("seniorMentorId", args?.seniorMentorId)
        createMenteeFormData.append("profilePicture", args?.profilePicture)
        return {
          url: `mentee`,
          method: "POST",
          formData: true,
          body: createMenteeFormData,
        }
      },
      transformResponse: (response) => {
        const mentee = response.data
        return mentee
      },
      invalidatesTags: () => [
        { type: "MENTEE", id: "LIST_OF_MENTEE" },
        { type: "CLASS", id: "LIST_OF_CLASS" },
      ],
    }),
    updateMentee: builder.mutation({
      query: (args) => {
        const updateMenteeFormData = new FormData()
        updateMenteeFormData.append("name", args?.name)
        updateMenteeFormData.append("no_telp", args?.no_telp)
        updateMenteeFormData.append("batch", args?.batch)
        updateMenteeFormData.append("major", args?.major)
        updateMenteeFormData.append("university", args?.university)
        updateMenteeFormData.append("classId", args?.classId)
        updateMenteeFormData.append("email", args?.email)
        updateMenteeFormData.append("username", args?.username)
        updateMenteeFormData.append("password", args?.password)
        updateMenteeFormData.append("seniorMentorId", args?.seniorMentorId)
        updateMenteeFormData.append("profilePicture", args?.profilePicture)
        return {
          url: `mentee/${args?.menteeId}`,
          method: "PUT",
          formData: true,
          body: updateMenteeFormData,
        }
      },
      transformResponse: (response) => {
        const mentee = response.data
        return mentee
      },
      invalidatesTags: () => [
        { type: "MENTEE", id: "LIST_OF_MENTEE" },
        { type: "CLASS", id: "LIST_OF_CLASS" },
      ],
    }),
    deleteMentee: builder.mutation({
      query: (args) => ({
        url: `mentee/${args?.menteeId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: () => {
        return true
      },
      invalidatesTags: () => [
        { type: "MENTEE", id: "LIST_OF_MENTEE" },
        { type: "CLASS", id: "LIST_OF_CLASS" },
      ],
    }),
  }),
})

export const {
  useFindMenteeByIdQuery,
  useFindAllMenteeByClassQuery,
  useFindAllMenteeQuery,
  useCreateMenteeMutation,
  useDeleteMenteeMutation,
  useUpdateMenteeMutation,
} = menteeApi
