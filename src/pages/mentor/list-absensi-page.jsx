import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import { GradientLink } from "@/components/common/gradient-link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MONTH_WITH_ID } from "@/constants/date"
import useInput from "@/hooks/useInput"
import { cn } from "@/lib/class-merge"
import { formattedDate, getAllWeeksInMonth, getWeekOfMonth } from "@/lib/date"
import { handleStatusPresence } from "@/lib/handle-statur-presence"
import { useFindWeeklyAttendanceQuery } from "@/store/api/attendance"
import { getUser } from "@/store/slices/user.slice"
import { useMemo, useState } from "react"
import { FaExchangeAlt } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import { useSelector } from "react-redux"

const initialMenteeSearch = {
  name: "",
}

export default function MentorListAbsensiPage() {
  const user = useSelector(getUser)

  // get the week of the month
  const [choosedWeek, setChoosedWeek] = useState(() =>
    getWeekOfMonth(new Date()),
  )

  // get the month
  const [choosedMonth, setChoosedMonth] = useState(
    () => new Date().getMonth() + 1,
  )

  // get all week of the month
  const allWeekOfTheMonth = useMemo(() => {
    return getAllWeeksInMonth(new Date().getFullYear(), choosedMonth)
  }, [choosedMonth])

  // get all date of the week
  const allDateOfTheWeek = useMemo(() => {
    return allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)
      ?.week
  }, [choosedWeek, allWeekOfTheMonth])

  // get the range of the week
  const [choosedRangeOfWeek, setChoosedRangeOfWeek] = useState(
    () =>
      allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)
        ?.range,
  )

  // search mentee
  const { values: searchMenteeValue, onChange: onChangeSearchMentee } =
    useInput(initialMenteeSearch)

  // get the weekly attendance
  const { data: weeklyAttendance, isSuccess: isSuccessGetWeeklyAttendance } =
    useFindWeeklyAttendanceQuery({
      classId: user?.class?.id,
      year: new Date().getFullYear(),
      month: choosedMonth,
      week: choosedWeek,
    })

  const filteredMentees = useMemo(() => {
    if (isSuccessGetWeeklyAttendance && weeklyAttendance?.mentees?.length > 0) {
      return weeklyAttendance?.mentees?.filter((mentee) =>
        mentee?.name
          .toLowerCase()
          .includes(searchMenteeValue.name.toLowerCase()),
      )
    }
    return []
  }, [searchMenteeValue, weeklyAttendance, isSuccessGetWeeklyAttendance])

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Absensi" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center  justify-between w-full">
            <div className="flex items-center gap-x-5 ">
              <GradientLink
                to={`/mentor/kelas/absensi/${user?.class?.id}/buat`}
                className="w-[190px] rounded-lg text-[16px]  flex gap-x-2 h-[48px] p-0"
                iconClassName="w-8 h-8"
                name="Input Absensi"
                Icon={IoMdAdd}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <GradientButton
                    className="w-[180px] rounded-lg text-[16px]  flex gap-x-5 h-[48px] p-0"
                    name="Ubah Filter"
                    iconClassName="w-5 h-5"
                    Icon={FaExchangeAlt}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className="px-0 space-y-3">
                  <AlertDialogHeader className="space-y-5 px-6">
                    <AlertDialogTitle className="font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text text-center text-[22px]">
                      Ubah Filter
                    </AlertDialogTitle>
                    <Separator />
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h1 className="font-medium">Pilih Bulan</h1>
                        <Select
                          value={choosedMonth}
                          className="w-full"
                          onValueChange={(e) => {
                            setChoosedMonth(e)
                            setChoosedWeek(1)
                            const selected = getAllWeeksInMonth(
                              new Date().getFullYear(),
                              e,
                            ).find((week) => week.numOfTheWeek === 1)
                            setChoosedRangeOfWeek(String(selected.range))
                          }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Bulan" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px] ">
                            {MONTH_WITH_ID.map((month, index) => {
                              return (
                                <SelectItem
                                  className={cn("border my-2 cursor-pointer", {
                                    "focus:bg-color-1 focus:text-white": true,
                                  })}
                                  key={index + 1}
                                  value={month.id}>
                                  {month.name}
                                </SelectItem>
                              )
                            })}{" "}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h1 className="font-medium">Pilih Minggu</h1>
                        <Select
                          className="w-full"
                          value={String(choosedRangeOfWeek)}
                          onValueChange={(e) => {
                            const selected = allWeekOfTheMonth.find(
                              (week) => week.range === e,
                            )
                            setChoosedWeek(selected.numOfTheWeek)
                            setChoosedRangeOfWeek(e)
                          }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Minggu" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px] ">
                            {allWeekOfTheMonth?.map((month, index) => {
                              return (
                                <SelectItem
                                  className={cn(
                                    "border my-2 cursor-pointer",
                                    {
                                      "focus:bg-color-1 focus:text-white": true,
                                    },
                                    {
                                      "bg-color-1 focus:text-white text-white":
                                        month?.range === choosedRangeOfWeek,
                                    },
                                  )}
                                  key={index + 1}
                                  value={String(month.range)}>
                                  <span className="font-semibold pr-1">
                                    Minggu ke-{month.numOfTheWeek},
                                  </span>{" "}
                                  {month.range}
                                </SelectItem>
                              )
                            })}{" "}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <AlertDialogDescription className="sr-only">
                      Change Date Filter
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Separator />
                  <AlertDialogFooter className="px-6 gap-x-3">
                    <AlertDialogCancel className="bg-color-1 text-white hover:text-white hover:bg-color-1/60">
                      Tutup
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-green-500 hover:bg-green-600">
                      Ubah
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <GradientInput
              onChange={onChangeSearchMentee}
              value={searchMenteeValue.name}
              name="name"
              placeholder="Cari Mentee..."
              inputClassName="text-[15px]"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                <TableHead className="w-[16px] text-white">No</TableHead>
                <TableHead className="w-[300px] text-white">Nama</TableHead>
                {allDateOfTheWeek.map((date, index) => {
                  return (
                    <TableHead
                      key={index + 1}
                      className="w-[300px]  text-sm text-white">
                      {formattedDate(date)}
                    </TableHead>
                  )
                })}
                <TableHead className="w-[100px] text-white">
                  Persentase
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border text-txt12_20 ">
              {isSuccessGetWeeklyAttendance &&
                weeklyAttendance?.mentees?.length > 0 &&
                filteredMentees?.map((mentee, index) => {
                  return (
                    <TableRow key={index + 1} className="border">
                      <TableCell className="font-semibold">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-semibold text-sm">
                        {mentee.name}
                      </TableCell>
                      {mentee?.attendance?.map((attd, index) => {
                        return (
                          <TableCell
                            key={index + 1}
                            className={cn(
                              "font-semibold text-sm",
                              {
                                "text-green-500 ": attd?.status === "PRESENT",
                              },
                              {
                                "text-red-500 ": attd?.status === "ABSENT",
                              },
                              {
                                "text-yellow-500 ": attd?.status === "HOLIDAY",
                              },
                            )}>
                            {handleStatusPresence(attd?.status)}
                          </TableCell>
                        )
                      })}
                      <TableCell className="flex gap-x-2 font-semibold text-sm">
                        {`${mentee?.percentagePresent}%`}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
