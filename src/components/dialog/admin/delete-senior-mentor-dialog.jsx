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

export default function AdminDeleteSeniorMentorDialog({
  open = false,
  onOpenChange,
  onClose,
  seniorMentor,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for detail senior mentor.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-medium  text-color-6">
              Detail Senior Mentor
            </span>
            <Separator />
          </AlertDialogTitle>
          {seniorMentor?.profilePicture && (
            <img
              src={getImageURL(seniorMentor?.profilePicture)}
              alt="Profile"
              className="w-[200px] h-[200px]"
            />
          )}
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{seniorMentor?.name}</td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>{seniorMentor?.username}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{seniorMentor?.email}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{seniorMentor?.no_telp}</td>
              </tr>
            </tbody>
          </table>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className=" px-8">
          <AlertDialogCancel asChild>
            <Button
              onClick={() => {
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-4 text-white hover:text-white hover:bg-color-4/60">
              Tutup
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteSeniorMentorDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  seniorMentor: PropTypes.object,
}
