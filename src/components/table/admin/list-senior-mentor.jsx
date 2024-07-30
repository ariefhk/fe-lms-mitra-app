import { GradientButton } from "@/components/common/gradient-button"
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

function AdminSeniorMentorRows({
  seniorMentors,
  isSuccessGetSeniorMentors,
  isLoadingGetSeniorMentors,
  onDetailSeniorMentor,
  onEditSeniorMentor,
  onDeleteSeniorMentor,
}) {
  let tableContent

  if (
    !isLoadingGetSeniorMentors &&
    isSuccessGetSeniorMentors &&
    seniorMentors.length > 0
  ) {
    tableContent = seniorMentors.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.username || "-"}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{c?.no_telp || "-"}</TableCell>
          <TableCell>{c?.mentorCount === 0 ? "0" : c?.mentorCount}</TableCell>
          <TableCell className="flex gap-x-2">
            <GradientButton
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDetailSeniorMentor(c)
              }}
              className="w-12 rounded-lg text-[18px] flex gap-x-5 h-[42px] p-0"
              iconClassName="w-6 h-6"
              Icon={MdOutlineVisibility}
            />
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditSeniorMentor(c)
              }}>
              Ubah
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteSeniorMentor(c)
              }}
              variant="destructive">
              Hapus
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetSeniorMentors) {
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
          Senior Mentor tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function AdminListSeniorMentorTable({
  seniorMentors,
  isSuccessGetSeniorMentors,
  isLoadingGetSeniorMentors,
  onDetailSeniorMentor,
  onEditSeniorMentor,
  onDeleteSeniorMentor,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1 hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[200px] text-white">Username</TableHead>
          <TableHead className="w-[200px] text-white">Nama</TableHead>
          <TableHead className="w-[300px] text-white">No Telepon</TableHead>
          <TableHead className="w-[200px] text-white">Jumlah Mentor</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminSeniorMentorRows
          seniorMentors={seniorMentors}
          isLoadingGetSeniorMentors={isLoadingGetSeniorMentors}
          isSuccessGetSeniorMentors={isSuccessGetSeniorMentors}
          onDeleteSeniorMentor={onDeleteSeniorMentor}
          onEditSeniorMentor={onEditSeniorMentor}
          onDetailSeniorMentor={onDetailSeniorMentor}
        />
      </TableBody>
    </Table>
  )
}

AdminListSeniorMentorTable.propTypes = {
  seniorMentors: PropTypes.array,
  isSuccessGetSeniorMentors: PropTypes.bool,
  isLoadingGetSeniorMentors: PropTypes.bool,
  onDetailSeniorMentor: PropTypes.func,
  onEditSeniorMentor: PropTypes.func,
  onDeleteSeniorMentor: PropTypes.func,
}
