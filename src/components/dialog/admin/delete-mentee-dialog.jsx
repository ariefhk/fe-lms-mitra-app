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
import { useDeleteMenteeMutation } from "@/store/api/mentee.api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteMenteeDialog({
  open = false,
  onOpenChange,
  mentee,
  onClose,
}) {
  const [deleteMentee, { isLoading: isLoadingDeleteMentee }] =
    useDeleteMenteeMutation()

  async function onDeleteMentee() {
    try {
      const deleteMenteeData = {
        menteeId: mentee?.id,
      }
      await deleteMentee(deleteMenteeData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Mentee!",
        text: "Selamat Anda berhasil menghapus mentee!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE Mentee: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Mentee!",
        text: error.message ?? "Maaf, Anda gagal menghapus mentee!",
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
          <AlertDialogTitle className="bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text text-center">
            Hapus Mentee
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="text-black">
            Apakah Anda yakin ingin menghapus Mentee ?
            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Username:</span>
                <span> {mentee?.username || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Nama:</span>
                <span>{mentee?.name || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Email:</span>
                <span>{mentee?.email || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">No Telp:</span>
                <span>{mentee?.no_telp || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Universitas:</span>
                <span>{mentee?.university || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Jurusan/Program Studi:</span>
                <span>{mentee?.major || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Batch:</span>
                <span>{mentee?.batch || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Kelas:</span>
                <span>{mentee?.class?.name || "-"}</span>
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
            disabled={isLoadingDeleteMentee}
            onClick={async () => {
              await onDeleteMentee()
            }}>
            {isLoadingDeleteMentee && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteMenteeDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  mentee: PropTypes.object,
  onClose: PropTypes.func,
}
