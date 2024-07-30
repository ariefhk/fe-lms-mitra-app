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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateAssignmentMutation } from "@/store/api/assignment.api"
import { format } from "date-fns"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function MentorEditFinalReportAssignmentDialog({
  open = false,
  classId,
  assignment,
  onOpenChange,
  onClose,
}) {
  const [updateAssignment, { isLoading: isLoadingUpdateAssignment }] =
    useUpdateAssignmentMutation()

  const form = useForm({
    defaultValues: {
      classId: "",
      title: "",
      description: "",
      dueDate: "",
      assignmentFile: "",
    },
  })

  useEffect(() => {
    form.reset({
      classId: classId,
      title: assignment?.title,
      description: assignment?.description,
      dueDate:
        assignment?.dueDate &&
        new Date(assignment?.dueDate).toISOString().split("T")[0],
    })
  }, [form, assignment, classId])

  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const updateAssignmentData = {
      classId: classId,
      assignmentId: assignment?.id,
      title: values.title,
      description: values.description,
      dueDate: format(new Date(values.dueDate), "yyyy-MM-dd"),
      assignmentFile: values.assignmentFile,
    }
    // console.log("CREATE TUGAS DATA: ", updateAssignmentData)
    try {
      await updateAssignment(updateAssignmentData).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Update Tugas!",
        text: "Selamat Anda berhasil ubah  tugas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR Ubah  TUGAS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Update  Tugas!",
        text: "Maaf, Anda gagal ubah tugas!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for adding Assignment.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
              Ubah Tugas Laporan Akhir
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="edit-assignment-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto py-2  w-full px-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Tugas Laporan </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukan judul tugas laporan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Tugas Laporan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukan deskripsi tugas laporan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenggat Waktu</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignmentFile"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>File Tugas Laporan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={value?.fileName}
                        onChange={(event) => {
                          const file = event?.target?.files[0]
                          if (!file) {
                            return
                          }
                          onChange(file)
                        }}
                        type="file"
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
              className="bg-color-1 text-white hover:text-white hover:bg-color-1/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isLoadingUpdateAssignment || !isFormValueChanged}
            form="edit-assignment-form"
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white gap-x-2 flex items-center">
            {isLoadingUpdateAssignment && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Ubah
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

MentorEditFinalReportAssignmentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  assignment: PropTypes.object,
  classId: PropTypes.string,
}
