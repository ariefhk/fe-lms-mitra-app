import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { loadingBarReducer } from "react-redux-loading-bar"
import { apiEndpoint, protectedApiEndpoint } from "./api/instance"
import attendanceReducer from "./slices/attendance.slice"
import counterReducer from "./slices/counter.slice"
import useReducer from "./slices/user.slice"

export const store = configureStore({
  reducer: {
    [apiEndpoint.reducerPath]: apiEndpoint.reducer,
    [protectedApiEndpoint.reducerPath]: protectedApiEndpoint.reducer,
    loadingBar: loadingBarReducer,
    counter: counterReducer,
    user: useReducer,
    attendance: attendanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiEndpoint.middleware)
      .concat(protectedApiEndpoint.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
