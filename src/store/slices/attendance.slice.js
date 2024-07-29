import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  attedance: [], // attendance list
  updateAttendance: [], // attendance list to be updated
}

export const attendanceSlice = createSlice({
  initialState,
  name: "attendance-slice",
  reducers: {
    clearAttendance: (state) => {
      state.attedance = []
    },

    clearUpdateAttendance: (state) => {
      state.updateAttendance = []
    },
    setAttendance: (state, action) => {
      state.attedance = action.payload
    },

    setChangeAllStudentAttendanceStatus: (state, action) => {
      // Update all attendance status
      if (state.attedance.length > 0) {
        // Update the existing attendance
        state.attedance = state.attedance.map((attd) => {
          return {
            ...attd,
            status: action.payload?.status,
          }
        })

        // Update the attendance in updateAttendance
        state.updateAttendance = state.attedance.map((attd) => {
          return {
            menteeId: attd.mentee.id,
            status: action.payload?.status,
          }
        })
      }
    },

    setChangeStudentAttendanceStatus: (state, action) => {
      // Create an object to update the attendance
      const attendanceObj = {
        menteeId: action.payload.menteeId,
        status: action.payload.status,
      }
      // Update the existing attendance
      const findStudent = state.attedance.find(
        (attd) => attd.mentee.id === attendanceObj.menteeId,
      )

      // Update the attendance in attendance
      if (findStudent) {
        // Update the existing attendance
        const updatedStudent = {
          ...findStudent,
          status: attendanceObj.status,
        }
        // Update the attendance
        state.attedance = state.attedance.map((attd) =>
          attd.mentee.id === attendanceObj.menteeId ? updatedStudent : attd,
        )
      }

      // Update the attendance in updateAttendance
      const findStudentInUpdateAttendance = state.updateAttendance.find(
        (mentee) => mentee.menteeId === attendanceObj.menteeId,
      )
      // Update the attendance in updateAttendance
      if (findStudentInUpdateAttendance) {
        state.updateAttendance = state.updateAttendance.map((mentee) =>
          mentee.menteeId === attendanceObj.menteeId ? attendanceObj : mentee,
        )
      } else {
        // Add the attendance to updateAttendance
        state.updateAttendance = [...state.updateAttendance, attendanceObj]
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setAttendance,
  setChangeStudentAttendanceStatus,
  setChangeAllStudentAttendanceStatus,
  clearAttendance,
  clearUpdateAttendance,
} = attendanceSlice.actions

// getter func
export const getAttendance = (state) => state.attendance.attedance
export const getUpdateAttendance = (state) => state.attendance.updateAttendance

export default attendanceSlice.reducer
