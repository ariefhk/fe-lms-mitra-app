import { LOCALSTORAGE } from "@/constants/localstorage-key"
import { getLocalStorageData } from "@/lib/localstorage"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Utility function to prepare headers
const prepareAuthHeaders = (headers) => {
  const token = getLocalStorageData(LOCALSTORAGE.USER)?.token
  console.log("current token: ", token)
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  return headers
}

// Public endpoint
export const apiEndpoint = createApi({
  reducerPath: "PUBLIC_ENDPOINT",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_BASE_API_URL,
  }),
  endpoints: () => ({}),
})

// Protected endpoint with JWT
export const protectedApiEndpoint = createApi({
  reducerPath: "PROTECTED_ENDPOINT",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_BASE_API_URL,
    prepareHeaders: prepareAuthHeaders,
    tagTypes: [
      "AUTH",
      "USER",
      "SENIOR_MENTOR",
      "MENTOR",
      "MENTEE",
      "CLASS",
      "ATTENDANCE",
      "ASSIGNMENT",
      "FILE",
    ],
  }),
  endpoints: () => ({}),
})
