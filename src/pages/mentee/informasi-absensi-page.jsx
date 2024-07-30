import DashboardHeader from "@/components/common/dashboard-header"
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
import { cn } from "@/lib/class-merge"
import { formattedDate, getAllWeeksInMonth, getWeekOfMonth } from "@/lib/date"
import { useFindMenteeWeeklyAttendanceQuery } from "@/store/api/attendance"
import { getUser } from "@/store/slices/user.slice"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

export default function MenteeInformasiAbsensiPage() {
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

  // get the range of the week
  const [choosedRangeOfWeek, setChoosedRangeOfWeek] = useState(
    () =>
      allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)
        ?.range,
  )

  // get the weekly attendance
  const { data: weeklyAttendance, isSuccess: isSuccessGetWeeklyAttendance } =
    useFindMenteeWeeklyAttendanceQuery({
      menteeId: user?.id,
      classId: user?.class?.id,
      year: new Date().getFullYear(),
      month: choosedMonth,
      week: choosedWeek,
    })

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Absensi" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:px-6 lg:pb-6 lg:pt-16">
        <div className="flex flex-col items-start gap-y-8">
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
          <Table>
            <TableHeader>
              <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                <TableHead className="w-[300px] text-white text-center text-[16px] font-medium">
                  Tanggal
                </TableHead>
                <TableHead className="w-[300px] text-white text-center text-[16px] font-medium">
                  Status Kehadiran
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border  ">
              {isSuccessGetWeeklyAttendance &&
                weeklyAttendance?.attendances?.map((attd, index) => {
                  return (
                    <TableRow className="border" key={index + 1}>
                      <TableCell className="text-center text-txt16_24 font-medium">
                        {formattedDate(attd?.date, true)}
                      </TableCell>
                      <TableCell className="text-center text-txt16_24 font-medium">
                        {attd?.status}
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
