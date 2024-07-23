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

function AdminClassRows({
  classes,
  isSuccessGetClasses,
  isLoadingGetClasses,
  onEditClass,
  onDeleteClass,
}) {
  let tableContent

  if (!isLoadingGetClasses && isSuccessGetClasses && classes.length > 0) {
    tableContent = classes.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{c?.mentor?.name || "-"}</TableCell>
          <TableCell>{c?.seniorMentor?.name || "-"}</TableCell>
          <TableCell>{c?.menteeCount || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditClass(c)
              }}>
              Edit
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteClass(c)
              }}
              variant="destructive">
              Hapus
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetClasses) {
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
          Kelas tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function AdminListClassTable({
  classes,
  isSuccessGetClasses,
  isLoadingGetClasses,
  onEditClass,
  onDeleteClass,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1 hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[200px] text-white">Nama Kelas</TableHead>
          <TableHead className="w-[300px] text-white">Mentor</TableHead>
          <TableHead className="w-[300px] text-white">Senior Mentor</TableHead>
          <TableHead className="w-[200px] text-white">Jumlah Mentee</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminClassRows
          classes={classes}
          isLoadingGetClasses={isLoadingGetClasses}
          isSuccessGetClasses={isSuccessGetClasses}
          onDeleteClass={onDeleteClass}
          onEditClass={onEditClass}
        />
      </TableBody>
    </Table>
  )
}

AdminListClassTable.propTypes = {
  classes: PropTypes.array,
  isSuccessGetClasses: PropTypes.bool,
  isLoadingGetClasses: PropTypes.bool,
  onEditClass: PropTypes.func,
  onDeleteClass: PropTypes.func,
}
