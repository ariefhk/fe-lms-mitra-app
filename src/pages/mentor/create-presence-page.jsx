import DashboardHeader from "@/components/common/dashboard-header"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { cn } from "@/lib/class-merge"
import { formattedDate } from "@/lib/date"
import {
  useCreateManyAttendanceMutation,
  useFindDailyAttendanceQuery,
} from "@/store/api/attendance"
import {
  clearUpdateAttendance,
  getAttendance,
  getUpdateAttendance,
  setChangeAllStudentAttendanceStatus,
  setChangeStudentAttendanceStatus,
} from "@/store/slices/attendance.slice"
import { getUser } from "@/store/slices/user.slice"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"

const initialStudentSearchInput = {
  name: "",
}

const isDisabled = (date) => {
  const isBefore1900 = date < new Date("1900-01-01")
  const isAfterToday = date > new Date()
  const isSunday = date.getDay() === 0
  const isSaturday = date.getDay() === 6
  return isBefore1900 || isAfterToday || isSunday || isSaturday
}

export default function MentorCreatePresencePage() {
  const {
    values: searchStudentByClassValue,
    onChange: onChangeStudentByClass,
  } = useInput(initialStudentSearchInput)

  const [date, setDate] = useState(() => {
    const today = new Date()
    if (today.getDay() === 6) {
      //  if today is saturday, add 2 days
      return new Date(today.setDate(today.getDate() + 2))
    } else if (today.getDay() === 0) {
      // if today is sunday, add 1 day
      return new Date(today.setDate(today.getDate() + 1))
    } else {
      return today
    }
  })
  const { classId } = useParams()

  console.log("classId", classId)

  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const attendance = useSelector(getAttendance)
  const updatedAttendance = useSelector(getUpdateAttendance)
  const {
    isOpenDialog: isOpenCalendarDialog,
    onOpenDialog: onOpenCalendarDialog,
  } = useDialog()

  const {
    data: attendanceData,
    isLoading: isLoadingGetDailyAttendance,
    isSuccess: isSuccessGetDailyAttendance,
  } = useFindDailyAttendanceQuery(
    {
      classId,
      date: format(date, "yyyy-MM-dd"),
    },
    { refetchOnMountOrArgChange: true },
  )

  const filteredAttendance = useMemo(() => {
    if (isSuccessGetDailyAttendance) {
      return attendance.filter((attd) => {
        return attd?.mentee?.name
          .toLowerCase()
          .includes(searchStudentByClassValue?.name?.toLowerCase())
      })
    }
    return []
  }, [attendance, isSuccessGetDailyAttendance, searchStudentByClassValue])

  const onStudentAttendance = (menteeId, status) => {
    dispatch(setChangeStudentAttendanceStatus({ menteeId, status }))
  }

  const onAllStudentAttendance = (status) => {
    dispatch(setChangeAllStudentAttendanceStatus({ status }))
  }

  const [createManyAttendance, { isLoading: isLoadingCreateManyAttendance }] =
    useCreateManyAttendanceMutation()

  const onSaveUpdateAttendance = async () => {
    try {
      const saveUpdateAttendanceObj = {
        classId,
        date: format(date, "yyyy-MM-dd"),
        menteeAttendances: updatedAttendance,
      }
      // console.log("Save Update Attendance", saveUpdateAttendanceObj)
      await createManyAttendance(saveUpdateAttendanceObj).unwrap()
      Swal.fire({
        icon: "success",
        title: "Sukses Simpan Absensi!",
        text: "Selamat, Anda berhasil menyimpan Absensi!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // console.log("Result Save Update Attendance", result)
        dispatch(clearUpdateAttendance())
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Simpan Absensi!!",
        text: error?.data?.message ?? "Maaf Anda gagal menyimpan Absensi!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // console.log("Error on Save Update Attendance", error)
      })
    }
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Input Absensi Mentee" />
      <main className="flex flex-1 flex-col   gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8 ">
          <div className="space-y-6  w-full">
            <div className="flex justify-between">
              <Popover
                open={isOpenCalendarDialog}
                onOpenChange={onOpenCalendarDialog}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !date && "text-muted-foreground",
                    )}>
                    {date ? (
                      formattedDate(date, true)
                    ) : (
                      <span>Pilih Tanggal</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 flex flex-col"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(choosedDate) => {
                      if (!choosedDate) {
                        return
                      }
                      setDate(choosedDate)
                      onOpenCalendarDialog(false)
                    }}
                    disabled={isDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center gap-x-10">
                <div className="flex items-center gap-x-3">
                  <Button
                    type="button"
                    onClick={() => onAllStudentAttendance("ABSENT")}>
                    Absen Semua
                  </Button>
                  <Button
                    type="button"
                    onClick={() => onAllStudentAttendance("PRESENT")}>
                    Hadir Semua
                  </Button>
                  <Button
                    type="button"
                    onClick={() => onAllStudentAttendance("HOLIDAY")}>
                    Libur Semua
                  </Button>
                </div>
                <div className="max-w-[224px] ">
                  <Input
                    placeholder="Cari Siswa..."
                    name="name"
                    onChange={onChangeStudentByClass}
                    value={searchStudentByClassValue.name}
                  />
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                  <TableHead className="w-[16px] text-white">No</TableHead>
                  <TableHead className="w-[300px] text-white">Nama</TableHead>
                  <TableHead className="w-[300px] text-white">
                    Tanggal
                  </TableHead>
                  <TableHead className="w-[300px] text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border text-txt12_20 ">
                {isSuccessGetDailyAttendance &&
                  filteredAttendance.length > 0 &&
                  filteredAttendance.map((attd, index) => {
                    return (
                      <TableRow key={index + 1} className="border">
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-txt16_24">
                          {attd.mentee.name}
                        </TableCell>
                        <TableCell className="font-medium text-txt16_24">
                          {formattedDate(attd.date, true)}
                        </TableCell>
                        <TableCell className="font-medium flex items-center gap-x-2">
                          <Button
                            type="button"
                            onClick={() =>
                              onStudentAttendance(attd.mentee.id, "ABSENT")
                            }
                            className={cn(
                              "bg-white text-[16px] px-5 py-2 text-black border-2 hover:bg-white",
                              {
                                "bg-color-1 text-white hover:bg-color-1":
                                  attd.status === "ABSENT",
                              },
                            )}>
                            Absen
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              onStudentAttendance(attd.mentee.id, "PRESENT")
                            }
                            className={cn(
                              "bg-white text-[16px] px-5 py-2 text-black border-2 hover:bg-white ",
                              {
                                "bg-color-1 text-white hover:bg-color-1":
                                  attd.status === "PRESENT",
                              },
                            )}>
                            Hadir
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              onStudentAttendance(attd.mentee.id, "HOLIDAY")
                            }
                            className={cn(
                              "bg-white text-[16px] px-5 py-2 text-black border-2 hover:bg-white",
                              {
                                "bg-color-1 text-white hover:bg-color-1":
                                  attd.status === "HOLIDAY",
                              },
                            )}>
                            Libur
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
              <TableFooter className="border">
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    <Button
                      disabled={updatedAttendance?.length === 0}
                      type="button"
                      onClick={async () => {
                        await onSaveUpdateAttendance()
                      }}>
                      Simpan Perubahan
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}
