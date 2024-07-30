import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const fileApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    downloadFile: builder.query({
      query: (args) => {
        return {
          url: `file-dowload?fileLocation=${args.fileLocation}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: () => {
        return true
      },
      providesTags: () => [{ type: "FILE", id: "DOWNLOAD_FILE" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED DOWNLOAD FILE: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const { useLazyDownloadFileQuery } = fileApi
