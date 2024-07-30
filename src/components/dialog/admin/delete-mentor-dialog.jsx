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
import { useDeleteMentorMutation } from "@/store/api/mentor.api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteMentorDialog({
  open = false,
  onOpenChange,
  mentor,
  onClose,
}) {
  const [deleteMentor, { isLoading: isLoadingDeleteMentor }] =
    useDeleteMentorMutation()

  async function onDeleteMentor() {
    try {
      const deleteMentorData = {
        mentorId: mentor.id,
      }
      await deleteMentor(deleteMentorData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Mentor!",
        text: "Selamat Anda berhasil menghapus Mentor!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE MENTOR: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Mentor!",
        text: error.message ?? "Maaf, Anda gagal menghapus Mentor!",
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
            Hapus Mentor
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="text-black">
            Apakah Anda yakin ingin menghapus Mentor ?
            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Username:</span>
                <span> {mentor?.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Nama:</span>
                <span>{mentor?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Email:</span>
                <span>{mentor?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">No Telp:</span>
                <span>{mentor?.no_telp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Kelas:</span>
                <span>{mentor?.class?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Senior Mentor:</span>
                <span>{mentor?.seniorMentor?.name}</span>
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
            disabled={isLoadingDeleteMentor}
            onClick={async () => {
              await onDeleteMentor()
            }}>
            {isLoadingDeleteMentor && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteMentorDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  mentor: PropTypes.object,
  onClose: PropTypes.func,
}
