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
import { getImageURL } from "@/lib/getImage"
import PropTypes from "prop-types"

export default function AdminDetailMentorDialog({
  open = false,
  onOpenChange,
  onClose,
  mentor,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[500px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for detail mentor.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[428px] px-8 flex-col gap-y-3 items-center gap-x-16">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
              Detail Mentor
            </span>
            <Separator />
          </AlertDialogTitle>
          {mentor?.profilePicture && (
            <img
              src={getImageURL(mentor?.profilePicture)}
              alt="Profile"
              className="w-[140px] h-[140px] rounded-full object-cover"
            />
          )}
          <div className="mt-4 grid gap-2  w-full text-txt14_20">
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
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className=" px-8">
          <AlertDialogCancel asChild>
            <Button
              onClick={() => {
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-1 text-white hover:text-white hover:bg-color-1/60">
              Tutup
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDetailMentorDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  mentor: PropTypes.object,
}
