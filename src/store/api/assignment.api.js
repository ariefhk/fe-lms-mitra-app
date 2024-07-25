import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const assignmentApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllAssignment: builder.query({
      query: (args) => {
        return {
          url: `assignment/class/${args?.classId}?title=${args.title}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const assignment = response?.data
        return assignment
      },
      providesTags: () => [{ type: "ASSIGNMENT", id: "LIST_OF_ASSIGNMENT" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL ASSIGNMENT: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    createAssignment: builder.mutation({
      query: (args) => {
        const createAssignmentFormData = new FormData()
        createAssignmentFormData.append("title", args?.title)
        createAssignmentFormData.append("description", args?.description)
        createAssignmentFormData.append("classId", args?.classId)
        createAssignmentFormData.append("dueDate", args?.dueDate)
        createAssignmentFormData.append("assignmentFile", args?.assignmentFile)
        return {
          url: `assignment`,
          method: "POST",
          formData: true,
          body: createAssignmentFormData,
        }
      },
      transformResponse: (response) => {
        const assignment = response.data
        return assignment
      },
      invalidatesTags: () => [{ type: "ASSIGNMENT", id: "LIST_OF_ASSIGNMENT" }],
    }),

    updateAssignment: builder.mutation({
      query: (args) => {
        const updateAssignmentFormData = new FormData()
        updateAssignmentFormData.append("title", args?.title)
        updateAssignmentFormData.append("description", args?.description)
        updateAssignmentFormData.append("classId", args?.classId)
        updateAssignmentFormData.append("dueDate", args?.dueDate)
        updateAssignmentFormData.append("assignmentFile", args?.assignmentFile)
        return {
          url: `assignment/${args?.assignmentId}`,
          method: "PUT",
          formData: true,
          body: updateAssignmentFormData,
        }
      },
      transformResponse: (response) => {
        const assignment = response.data
        return assignment
      },
      invalidatesTags: () => [{ type: "ASSIGNMENT", id: "LIST_OF_ASSIGNMENT" }],
    }),

    deleteAssignment: builder.mutation({
      query: (args) => ({
        url: `assignment/${args?.assignmentId}`,
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
        { type: "ASSIGNMENT", id: "LIST_OF_ASSIGNMENT" },
      ],
    }),
  }),
})

export const {
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useFindAllAssignmentQuery,
  useUpdateAssignmentMutation,
} = assignmentApi
