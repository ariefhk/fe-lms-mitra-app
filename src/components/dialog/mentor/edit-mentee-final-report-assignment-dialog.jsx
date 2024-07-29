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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { MENTOR_ASSIGNMENT_STATUS } from "@/constants/assignment-status"
import { useCreateMentorFinalReportReviewAssignmentMutation } from "@/store/api/assignment.api"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function MentorEditMenteeFinalReportAssignmentDialog({
  open = false,
  menteeId,
  assignmentId,
  onOpenChange,
  onClose,
}) {
  const [
    mentorReviewMenteeFinalReportAssignment,
    { isLoading: isLoadingMentorReviewFinalReportMenteeAssignment },
  ] = useCreateMentorFinalReportReviewAssignmentMutation()

  const form = useForm({
    defaultValues: {
      assignmentId: "",
      menteeId: "",
      description: "",
      status: "",
    },
  })

  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const mentorReviewFinalReportData = {
      assignmentId: assignmentId,
      menteeId: menteeId,
      description: values.description,
      status: values.status,
    }
    // console.log("CREATE TUGAS DATA: ", mentorReviewFinalReportData)
    try {
      await mentorReviewMenteeFinalReportAssignment(
        mentorReviewFinalReportData,
      ).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Memeriksa Laporan Akhir Mentee!",
        text: "Selamat Anda berhasil memeriksa laporan akhir mentee!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR Ubah  TUGAS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Memeriksa Laporan Akhir Mentee!",
        text: "Maaf, Anda gagal memeriksa laporan akhir mentee!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for grading mentee final report Assignment.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-medium  text-color-6">
              Memeriksa Laporan Akhir Mentee
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="review-final-report-assignment-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto py-2  w-full px-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Laporan Akhir</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Laporan Akhir Mentee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MENTOR_ASSIGNMENT_STATUS.map((status) => {
                          return (
                            <SelectItem key={status.id} value={status.value}>
                              {status.key}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Masukan</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={
                          form.watch("status") !== "REVISION" ||
                          form.watch("status") === ""
                        }
                        placeholder={
                          form.watch("status") !== "REVISION" ||
                          form.watch("status") === ""
                            ? "Anda bisa memberikan masukan jika terdapat revisi"
                            : "Masukkan Revisi pada laporan akhir mentee"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className=" px-8">
          <AlertDialogCancel asChild>
            <Button
              onClick={() => {
                form.reset()
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-4 text-white hover:text-white hover:bg-color-4/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={
              isLoadingMentorReviewFinalReportMenteeAssignment ||
              !isFormValueChanged
            }
            form="review-final-report-assignment-form"
            type="submit"
            className="bg-color-5 hover:bg-color-5/60 text-white gap-x-2 flex items-center">
            {isLoadingMentorReviewFinalReportMenteeAssignment && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

MentorEditMenteeFinalReportAssignmentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  assignmentId: PropTypes.string,
  menteeId: PropTypes.string,
}
