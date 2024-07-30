import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PropTypes from "prop-types"

function MenteeNilaiRows({
  menteeAssignments,
  isSuccessGetMenteeAssignments,
  isLoadingGetMenteeAssignments,
}) {
  let tableContent

  if (
    !isLoadingGetMenteeAssignments &&
    isSuccessGetMenteeAssignments &&
    menteeAssignments.length > 0
  ) {
    tableContent = menteeAssignments.map((c, index) => {
      return (
        <TableRow className="border text-[16px]" key={index + 1}>
          <TableCell className="font-medium text-center">{index + 1}</TableCell>
          <TableCell className="text-center">
            {c?.assignment?.title || "-"}
          </TableCell>
          <TableCell className="text-center">{c?.grade || "-"}</TableCell>
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
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={7} className="text-center">
          Tugas tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function MenteeListNilaiMenteeTable({
  totalGrade,
  menteeAssignments,
  isSuccessGetMenteeAssignments,
  isSuccessGetCalculatedMenteeAsignments,
  isLoadingGetMenteeAssignments,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1 hover:bg-color-1/80 text-[16px]">
          <TableHead className="w-[20px] text-white text-center ">No</TableHead>
          <TableHead className="w-[200px] text-white text-center">
            Tugas
          </TableHead>
          <TableHead className="w-[200px] text-white text-center">
            Nilai
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <MenteeNilaiRows
          menteeAssignments={menteeAssignments}
          isLoadingGetMenteeAssignments={isLoadingGetMenteeAssignments}
          isSuccessGetMenteeAssignments={isSuccessGetMenteeAssignments}
        />
      </TableBody>
      <TableFooter className="border">
        <TableRow className="text-[16px]">
          <TableCell className="text-center"></TableCell>
          <TableCell className="text-center font-semibold">Rata-rata</TableCell>
          <TableCell className="text-center font-semibold">
            {isSuccessGetCalculatedMenteeAsignments ? totalGrade : "-"}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

MenteeListNilaiMenteeTable.propTypes = {
  menteeAssignments: PropTypes.array,
  isSuccessGetMenteeAssignments: PropTypes.bool,
  isLoadingGetMenteeAssignments: PropTypes.bool,
  isSuccessGetCalculatedMenteeAsignments: PropTypes.bool,
  totalGrade: PropTypes.number,
}
