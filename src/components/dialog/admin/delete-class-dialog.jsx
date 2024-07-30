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
import { useDeleteClassMutation } from "@/store/api/class.api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteClassDialog({
  open = false,
  onOpenChange,
  classes,
  onClose,
}) {
  const [deleteClass, { isLoading: isLoadingDeleteClass }] =
    useDeleteClassMutation()

  async function onDeleteClass() {
    try {
      const deleteClassData = {
        classId: classes.id,
      }
      await deleteClass(deleteClassData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Kelas!",
        text: "Selamat Anda berhasil menghapus kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE CLASS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Kelas!",
        text: error.message ?? "Maaf, Anda gagal menghapus kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 font-poppins">
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <AlertDialogHeader className="px-6">
          <AlertDialogTitle className="text-center bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
            Hapus Kelas
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="text-black">
            Apakah Anda yakin ingin menghapus kelas{" "}
            <span className="underline underline-offset-4 font-semibold">
              {classes?.name}
            </span>{" "}
            ?
            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Kelas:</span>
                <span>{classes?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Mentor:</span>
                <span>{classes?.mentor?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Senior Mentor:</span>
                <span>{classes?.seniorMentor?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Jumlah Mentee:</span>
                <span>{classes?.menteeCount}</span>
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
            disabled={isLoadingDeleteClass}
            onClick={async () => {
              await onDeleteClass()
            }}>
            {isLoadingDeleteClass && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteClassDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  classes: PropTypes.object,
  onClose: PropTypes.func,
}
