import DashboardHeader from "@/components/common/dashboard-header"
import { GradientInput } from "@/components/common/gradient-input"
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
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useFindWeeklyAttendanceQuery } from "@/store/api/attendance"
import { getUser } from "@/store/slices/user.slice"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

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

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Absensi" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center  justify-between w-full">
            <div className="flex items-center gap-x-2 ">
              <Button asChild>
                <Link to={`/mentor/kelas/absensi/${user?.class?.id}/buat`}>
                  Input Absensi
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Ubah Filter</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className="space-y-5">
                    <AlertDialogTitle>Ubah Filter</AlertDialogTitle>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <h1>Pilih Bulan</h1>
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
                        <h1>Pilih Minggu</h1>
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
                              console.log("month", month)
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
                    <AlertDialogDescription className=" sr-only">
                      test
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
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
                weeklyAttendance?.mentees?.map((mentee, index) => {
                  return (
                    <TableRow key={index + 1} className="border">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {mentee.name}
                      </TableCell>
                      {mentee?.attendance?.map((attd, index) => {
                        return (
                          <TableCell key={index + 1}>{attd?.status}</TableCell>
                        )
                      })}
                      <TableCell className="flex gap-x-2">
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
