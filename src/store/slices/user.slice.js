// import { AUTH_KEY } from "@/constants/localstorage-key"
import { LOCALSTORAGE } from "@/constants/localstorage-key"
import {
  deleteLocalStorageData,
  getLocalStorageData,
  saveLocalStorageData,
} from "@/lib/localstorage"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: getLocalStorageData(LOCALSTORAGE.USER) || {},
}

export const userSlice = createSlice({
  initialState,
  name: "user-slice",
  reducers: {
    clearUser: (state) => {
      state.user = {}
      deleteLocalStorageData(LOCALSTORAGE.USER)
    },

    setUser: (state, action) => {
      state.user = action.payload
      saveLocalStorageData(LOCALSTORAGE.USER, action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

// getter func
export const getUser = (state) => state.user.user

export default userSlice.reducer
