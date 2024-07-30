import { GradientButton } from "@/components/common/gradient-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PropTypes from "prop-types"
import { MdOutlineVisibility } from "react-icons/md"

function MentorMenteeRows({
  mentees,
  isSuccessGetMentees,
  isLoadingGetMentees,
  onDetailMentee,
}) {
  let tableContent

  if (!isLoadingGetMentees && isSuccessGetMentees && mentees.length > 0) {
    tableContent = mentees.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.username || "-"}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{c?.no_telp || "-"}</TableCell>
          <TableCell>{c?.class?.name || "-"}</TableCell>
          <TableCell>{c?.batch || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <GradientButton
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDetailMentee(c)
              }}
              className="w-12 rounded-lg text-[18px] flex gap-x-5 h-[42px] p-0"
              iconClassName="w-6 h-6"
              Icon={MdOutlineVisibility}
            />
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetMentees) {
    tableContent = Array.from({ length: 3 }).map((_, index) => {
      return (
        <TableRow key={index + 1}>
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
          Mentee tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function MentorListMenteeTable({
  mentees,
  isSuccessGetMentees,
  isLoadingGetMentees,
  onDetailMentee,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1 hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[200px] text-white">Username</TableHead>
          <TableHead className="w-[200px] text-white">Nama</TableHead>
          <TableHead className="w-[300px] text-white">No Telepon</TableHead>
          <TableHead className="w-[200px] text-white">Kelas</TableHead>
          <TableHead className="w-[200px] text-white">Batch</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <MentorMenteeRows
          mentees={mentees}
          isLoadingGetMentees={isLoadingGetMentees}
          isSuccessGetMentees={isSuccessGetMentees}
          onDetailMentee={onDetailMentee}
        />
      </TableBody>
    </Table>
  )
}

MentorListMenteeTable.propTypes = {
  mentees: PropTypes.array,
  isSuccessGetMentees: PropTypes.bool,
  isLoadingGetMentees: PropTypes.bool,
  onDetailMentee: PropTypes.func,
}
