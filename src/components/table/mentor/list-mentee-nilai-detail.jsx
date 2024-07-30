import { GradientLink } from "@/components/common/gradient-link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/class-merge"
import { formattedDate } from "@/lib/date"
import { getFile } from "@/lib/getFile"
import { translateAssignmentStatus } from "@/lib/translate-assignment-status"
import PropTypes from "prop-types"
import { MdOutlineVisibility } from "react-icons/md"

export function translateAssignmentStatusStyle(status) {
  switch (status) {
    case "UNCOMPLETED":
      return "text-rose-600"
    case "PENDING":
      return "text-yellow-600"
    case "REVISION":
      return "text-rose-600"
    case "COMPLETED":
      return "text-green-600"
  }
}

function MentorMenteeRows({
  menteeAssignments,
  isSuccessGetMenteeAssignments,
  isLoadingGetMenteeAssignments,
  onEditMenteeAssigment,
}) {
  let tableContent

  if (
    !isLoadingGetMenteeAssignments &&
    isSuccessGetMenteeAssignments &&
    menteeAssignments.length > 0
  ) {
    tableContent = menteeAssignments.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.assignment?.title || "-"}</TableCell>
          <TableCell>
            <GradientLink
              to={getFile(c?.assignment?.file)}
              className="w-12 rounded-lg text-[18px] flex gap-x-5 h-[42px] p-0"
              iconClassName="w-6 h-6"
              Icon={MdOutlineVisibility}
            />
          </TableCell>
          <TableCell>
            {formattedDate(c?.assignment?.dueDate, true) || "-"}
          </TableCell>
          <TableCell
            className={cn(
              "font-bold",
              translateAssignmentStatusStyle(c?.status),
            )}>
            {translateAssignmentStatus(c?.status) || "-"}
          </TableCell>
          <TableCell>{c?.grade || "-"}</TableCell>
          <TableCell>
            <GradientLink
              to={c?.status === "UNCOMPLETED" ? "#" : getFile(c?.file)}
              className="w-12 rounded-lg text-[18px] flex gap-x-5 h-[42px] p-0"
              iconClassName="w-6 h-6"
              Icon={MdOutlineVisibility}
            />
          </TableCell>
          <TableCell className="flex gap-x-2">
            <Button
              disabled={c?.status === "UNCOMPLETED"}
              className="bg-green-500 hover:bg-green-600"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditMenteeAssigment(c)
              }}>
              Beri Nilai
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetMenteeAssignments) {
    tableContent = Array.from({ length: 3 }).map((_, index) => {
      return (
        <TableRow key={index + 1}>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="flex gap-x-2">
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
          </TableCell>
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={7} className="text-center">
          Tugas Mentee tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function MentorListNilaiDetailMenteeTable({
  menteeAssignments,
  isSuccessGetMenteeAssignments,
  isLoadingGetMenteeAssignments,
  onEditMenteeAssigment,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1 hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[200px] text-white">Nama Tugas</TableHead>
          <TableHead className="w-[140px] text-white">File Tugas</TableHead>
          <TableHead className="w-[300px] text-white">Tenggat</TableHead>
          <TableHead className="w-[200px] text-white">Status</TableHead>
          <TableHead className="w-[200px] text-white">Score</TableHead>
          <TableHead className="w-[180px] text-white">File Jawaban</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <MentorMenteeRows
          menteeAssignments={menteeAssignments}
          isLoadingGetMenteeAssignments={isLoadingGetMenteeAssignments}
          isSuccessGetMenteeAssignments={isSuccessGetMenteeAssignments}
          onEditMenteeAssigment={onEditMenteeAssigment}
        />
      </TableBody>
    </Table>
  )
}

MentorListNilaiDetailMenteeTable.propTypes = {
  menteeAssignments: PropTypes.array,
  isSuccessGetMenteeAssignments: PropTypes.bool,
  isLoadingGetMenteeAssignments: PropTypes.bool,
  onEditMenteeAssigment: PropTypes.func,
}
