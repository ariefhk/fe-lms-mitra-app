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
import { useDeleteSeniorMentorMutation } from "@/store/api/senior-mentor.api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteSeniorMentorDialog({
  open = false,
  onOpenChange,
  seniorMentor,
  onClose,
}) {
  const [deleteSeniorMentor, { isLoading: isLoadingDeleteSeniorMentor }] =
    useDeleteSeniorMentorMutation()

  async function onDeleteSeniorMentor() {
    try {
      const deleteSeniorMentorData = {
        seniorMentorId: seniorMentor.id,
      }
      await deleteSeniorMentor(deleteSeniorMentorData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Senior Mentor!",
        text: "Selamat Anda berhasil menghapus Senior Mentor!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE Senior MENTOR: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Senior Mentor!",
        text: error.message ?? "Maaf, Anda gagal menghapus Senior Mentor!",
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
            Hapus Senior Mentor
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="text-black">
            Apakah Anda yakin ingin menghapus Senior Mentor ?
            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Username:</span>
                <span> {seniorMentor?.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Nama:</span>
                <span>{seniorMentor?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Email:</span>
                <span>{seniorMentor?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">No Telp:</span>
                <span>{seniorMentor?.no_telp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Jumlah Mentor:</span>
                <span>{seniorMentor?.mentorCount}</span>
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
            disabled={isLoadingDeleteSeniorMentor}
            onClick={async () => {
              await onDeleteSeniorMentor()
            }}>
            {isLoadingDeleteSeniorMentor && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteSeniorMentorDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  seniorMentor: PropTypes.object,
  onClose: PropTypes.func,
}
