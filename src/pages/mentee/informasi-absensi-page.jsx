import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MONTH_WITH_ID } from "@/constants/date"
import { cn } from "@/lib/class-merge"
import { formattedDate, getAllWeeksInMonth, getWeekOfMonth } from "@/lib/date"
import { handleStatusPresence } from "@/lib/handle-statur-presence"
import { useFindMenteeWeeklyAttendanceQuery } from "@/store/api/attendance"
import { getUser } from "@/store/slices/user.slice"
import { useMemo, useState } from "react"
import { FaExchangeAlt } from "react-icons/fa"
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
      classId: user?.class?.id,
      menteeId: user?.id,
      year: new Date().getFullYear(),
      month: choosedMonth,
      week: choosedWeek,
    })

  console.log(weeklyAttendance)

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Absensi" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:px-6 lg:pb-6 lg:pt-16">
        <div className="flex flex-col items-start gap-y-8">
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
                      <TableCell
                        className={cn(
                          "font-semibold text-[16px] text-center",
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
                    </TableRow>
                  )
                })}
            </TableBody>
            <TableFooter className="border">
              <TableRow className="text-[16px]">
                <TableCell className="text-center font-semibold">
                  Rata-rata
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {isSuccessGetWeeklyAttendance
                    ? `${weeklyAttendance?.percentagePresent} %`
                    : "-"}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </div>
  )
}
