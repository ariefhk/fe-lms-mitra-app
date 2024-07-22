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
import PropTypes from "prop-types"
import { MdOutlineVisibility } from "react-icons/md"

function AdminMentorRows({
  mentors,
  isSuccessGetMentors,
  isLoadingGetMentors,
  onEditMentor,
  onDeleteMentor,
}) {
  let tableContent

  if (!isLoadingGetMentors && isSuccessGetMentors && mentors.length > 0) {
    tableContent = mentors.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.username || "-"}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{c?.no_telp || "-"}</TableCell>
          <TableCell>{c?.class?.name || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <GradientLink
              to={"/admin/user/mentor/" + c.id}
              className="w-12 rounded-lg text-[18px] flex gap-x-5 h-[42px] p-0"
              iconClassName="w-6 h-6"
              Icon={MdOutlineVisibility}
            />
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditMentor(c)
              }}>
              Edit
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteMentor(c)
              }}
              variant="destructive">
              Hapus
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetMentors) {
    tableContent = Array.from({ length: 3 }).map((_, index) => {
      return (
        <TableRow key={index + 1}>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="flex gap-x-2">
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
          </TableCell>
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={7} className="text-center">
          Mentor tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function AdminListMentorTable({
  mentors,
  isSuccessGetMentors,
  isLoadingGetMentors,
  onEditMentor,
  onDeleteMentor,
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
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminMentorRows
          mentors={mentors}
          isLoadingGetMentors={isLoadingGetMentors}
          isSuccessGetMentors={isSuccessGetMentors}
          onDeleteMentor={onDeleteMentor}
          onEditMentor={onEditMentor}
        />
      </TableBody>
    </Table>
  )
}

AdminListMentorTable.propTypes = {
  mentors: PropTypes.array,
  isSuccessGetMentors: PropTypes.bool,
  isLoadingGetMentors: PropTypes.bool,
  onEditMentor: PropTypes.func,
  onDeleteMentor: PropTypes.func,
}
