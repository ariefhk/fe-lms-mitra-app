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

export default function DetailMenteeDialog({
  open = false,
  onOpenChange,
  onClose,
  mentee,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[500px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for detail mentee.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[500px] px-8 flex-col gap-y-3 items-center gap-x-16">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
              Detail Mentee
            </span>
            <Separator />
          </AlertDialogTitle>
          {mentee?.profilePicture && (
            <img
              src={getImageURL(mentee?.profilePicture)}
              alt="Profile"
              className="w-[140px] h-[140px] rounded-full object-cover"
            />
          )}
          <div className="mt-4 grid gap-2  w-full text-txt14_20">
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

DetailMenteeDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  mentee: PropTypes.object,
}
