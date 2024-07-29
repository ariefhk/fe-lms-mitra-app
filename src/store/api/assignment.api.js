import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const assignmentApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllMenteeAssignment: builder.query({
      query: (args) => {
        return {
          url: `mentee-assignment/mentee/${args?.menteeId}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const menteeAssignment = response?.data
        return menteeAssignment
      },
      providesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_MENTEE_ASSIGNMENT" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL MENTEE ASSIGNMENT: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    findMenteeAssignmentDetail: builder.query({
      query: (args) => {
        return {
          url: `mentee-assignment/mentee/${args?.menteeId}/${args?.assignmentId}/detail`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const menteeAssignmentDetail = response?.data
        return menteeAssignmentDetail
      },
      providesTags: () => [
        { type: "ASSIGNMENT", id: "MENTEE_ASSIGNMENT_DETAIL" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET MENTEE ASSIGNMENT DETAIL: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),

    findAllFinalReportMenteeAssignment: builder.query({
      query: (args) => {
        return {
          url: `mentee-assignment/mentee/${args?.menteeId}/final-report`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const finalReportMenteeAssignments = response?.data
        return finalReportMenteeAssignments
      },
      providesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_MENTEE_ASSIGNMENT" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL FINAL REPORT MENTEE ASSIGNMENT: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),

    findCalculateMenteeAssignmentGrade: builder.query({
      query: (args) => {
        return {
          url: `mentee-assignment/calculate-grade/${args?.menteeId}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const calculateMenteeAssignment = response?.data
        return calculateMenteeAssignment
      },
      providesTags: () => [
        { type: "ASSIGNMENT", id: "CALCULATED_MENTEE_ASSIGNMENT_GRADE" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET CALCULATED MENTEE ASSIGNMENT GRADE: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),

    createMenteeSubmitAssignment: builder.mutation({
      query: (args) => {
        const createMenteeSubmitAssignmentFormData = new FormData()
        createMenteeSubmitAssignmentFormData.append("menteeId", args?.menteeId)
        createMenteeSubmitAssignmentFormData.append(
          "assignmentId",
          args?.assignmentId,
        )
        createMenteeSubmitAssignmentFormData.append(
          "assignmentFile",
          args?.assignmentFile,
        )
        return {
          url: `mentee-assignment`,
          method: "PUT",
          formData: true,
          body: createMenteeSubmitAssignmentFormData,
        }
      },
      transformResponse: (response) => {
        const menteeSubmitAssignment = response.data
        return menteeSubmitAssignment
      },
      invalidatesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "CALCULATED_MENTEE_ASSIGNMENT_GRADE" },
      ],
    }),

    createMentorReviewAssignment: builder.mutation({
      query: (args) => ({
        url: `mentee-assignment/review`,
        method: "PUT",
        body: {
          menteeId: args?.menteeId,
          assignmentId: args?.assignmentId,
          grade: args?.grade,
          status: args?.status,
        },
      }),
      transformResponse: (response) => {
        const mentorReviewAssignment = response.data
        return mentorReviewAssignment
      },
      invalidatesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "CALCULATED_MENTEE_ASSIGNMENT_GRADE" },
      ],
    }),

    createMentorFinalReportReviewAssignment: builder.mutation({
      query: (args) => ({
        url: `mentee-assignment/review/final-report`,
        method: "PUT",
        body: {
          menteeId: args?.menteeId,
          assignmentId: args?.assignmentId,
          status: args?.status,
        },
      }),
      transformResponse: (response) => {
        const mentorFinalReportReviewAssignment = response.data
        return mentorFinalReportReviewAssignment
      },
      invalidatesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "CALCULATED_MENTEE_ASSIGNMENT_GRADE" },
      ],
    }),

    findAllAssignment: builder.query({
      query: (args) => {
        return {
          url: `assignment/class/${args?.classId}?title=${args.title}`,
          method: "GET",
        }
      },
      transformResponse: (response) => {
        const assignments = response?.data
        return assignments
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

    findAllFinalReportAssignment: builder.query({
      query: (args) => {
        return {
          url: `assignment/class/${args?.classId}/final-report?title=${args.title}`,
          method: "GET",
        }
      },
      transformResponse: (response) => {
        const finalReportAssignments = response?.data
        return finalReportAssignments
      },
      providesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_ASSIGNMENT" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL FINAL REPORT ASSIGNMENT: ",
            error,
          )
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
      invalidatesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_MENTEE_ASSIGNMENT" },
      ],
    }),

    createFinalReportAssignment: builder.mutation({
      query: (args) => {
        const createAssignmentFormData = new FormData()
        createAssignmentFormData.append("title", args?.title)
        createAssignmentFormData.append("description", args?.description)
        createAssignmentFormData.append("classId", args?.classId)
        createAssignmentFormData.append("dueDate", args?.dueDate)
        createAssignmentFormData.append("assignmentFile", args?.assignmentFile)
        return {
          url: `assignment/final-report`,
          method: "POST",
          formData: true,
          body: createAssignmentFormData,
        }
      },
      transformResponse: (response) => {
        const finalReportAssignment = response.data
        return finalReportAssignment
      },
      invalidatesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_MENTEE_ASSIGNMENT" },
      ],
    }),

    updateAssignment: builder.mutation({
      query: (args) => {
        const updateAssignmentFormData = new FormData()
        updateAssignmentFormData.append("classId", args?.classId)
        updateAssignmentFormData.append("title", args?.title)
        updateAssignmentFormData.append("description", args?.description)
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
      invalidatesTags: () => [
        { type: "ASSIGNMENT", id: "LIST_OF_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_MENTEE_ASSIGNMENT" },
      ],
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
        { type: "ASSIGNMENT", id: "LIST_OF_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_MENTEE_ASSIGNMENT" },
        { type: "ASSIGNMENT", id: "LIST_OF_FINAL_REPORT_MENTEE_ASSIGNMENT" },
      ],
    }),
  }),
})

export const {
  useFindMenteeAssignmentDetailQuery,
  useFindAllMenteeAssignmentQuery,
  useFindAllFinalReportMenteeAssignmentQuery,
  useFindCalculateMenteeAssignmentGradeQuery,
  useCreateMenteeSubmitAssignmentMutation,
  useCreateMentorReviewAssignmentMutation,
  useCreateMentorFinalReportReviewAssignmentMutation,
  useFindAllAssignmentQuery,
  useFindAllFinalReportAssignmentQuery,
  useCreateFinalReportAssignmentMutation,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi
