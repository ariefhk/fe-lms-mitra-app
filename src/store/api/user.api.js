import { hideLoading, showLoading } from "react-redux-loading-bar"
import { setUser } from "../slices/user.slice"
import { protectedApiEndpoint } from "./instance"

export const userApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: `auth/me`,
          method: "GET",
        }
      },
      transformResponse: (response) => {
        const user = response?.data
        return user
      },
      providesTags: () => [{ type: "USER", id: "CURRENT_USER" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET CURRENT USER: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: `auth/logout`,
          method: "DELETE",
        }
      },
      transformResponse: (response) => {
        const user = response.data
        return user
      },
      invalidatesTags: () => [{ type: "USER", id: "CURRENT_USER" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED LOGOUT USER: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    updateCurrentUser: builder.mutation({
      query: (args) => {
        const updateCurrentUserFormData = new FormData()
        updateCurrentUserFormData.append("username", args?.username)
        updateCurrentUserFormData.append("password", args?.password)
        updateCurrentUserFormData.append("name", args?.name)
        updateCurrentUserFormData.append("email", args?.email)
        updateCurrentUserFormData.append("no_telp", args?.no_telp)
        updateCurrentUserFormData.append("profilePicture", args?.profilePicture)
        return {
          url: `auth/me/update`,
          method: "PUT",
          formData: true,
          body: updateCurrentUserFormData,
        }
      },
      transformResponse: (response) => {
        const user = response.data
        return user
      },
      invalidatesTags: () => [{ type: "USER", id: "CURRENT_USER" }],
      async onQueryStarted(_args, { dispatch, getState, queryFulfilled }) {
        dispatch(showLoading())

        try {
          const { data: user } = await queryFulfilled
          const token = getState()?.user?.user?.token
          const updatedUser = {
            token: token,
            ...user,
          }
          dispatch(setUser(updatedUser))
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED UPDATE USER: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useLogoutMutation,
  useUpdateCurrentUserMutation,
} = userApi
