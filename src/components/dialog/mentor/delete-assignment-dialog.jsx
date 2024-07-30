import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formattedDate } from "@/lib/date"
import { useDeleteAssignmentMutation } from "@/store/api/assignment.api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function MentorDeleteAssignmentDialog({
  open = false,
  onOpenChange,
  assignment,
  onClose,
}) {
  const [deleteAssignment, { isLoading: isLoadingDeleteAssignment }] =
    useDeleteAssignmentMutation()

  async function onDeleteAssignment() {
    try {
      const deleteAssignmentData = {
        assignmentId: assignment.id,
      }
      await deleteAssignment(deleteAssignmentData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Tugas!",
        text: "Selamat Anda berhasil menghapus tugas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE TUGAS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Tugas!",
        text: error.message ?? "Maaf, Anda gagal menghapus tugas!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 font-poppins max-w-[400px]">
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <AlertDialogHeader className="px-6">
          <AlertDialogTitle className="text-center bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
            Hapus Tugas
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="text-black">
            Apakah Anda yakin ingin menghapus Tugas ?
            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Nama Tugas:</span>
                <span>{assignment?.title || "_"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Tenggat Waktu:</span>
                <span>
                  {assignment?.dueDate
                    ? formattedDate(assignment?.dueDate)
                    : "_"}
                </span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="px-6">
          <AlertDialogCancel asChild>
            <Button
              type="button"
              onClick={() => {
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-1 text-white hover:text-white hover:bg-color-1/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isLoadingDeleteAssignment}
            onClick={async () => {
              await onDeleteAssignment()
            }}>
            {isLoadingDeleteAssignment && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

MentorDeleteAssignmentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  assignment: PropTypes.object,
  onClose: PropTypes.func,
}
