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
import { useCreateFinalReportAssignmentMutation } from "@/store/api/assignment.api"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function MentorCreateFinalReportAssignmentDialog({
  open = false,
  classId,
  onOpenChange,
  onClose,
}) {
  const [
    createFinalReportAssignment,
    { isLoading: isLoadingCreateFinalReportAssignment },
  ] = useCreateFinalReportAssignmentMutation()

  const form = useForm({
    defaultValues: {
      classId: "",
      title: "",
      description: "",
      dueDate: "",
      assignmentFile: "",
    },
  })

  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const createFinalReportAssignmentData = {
      classId: classId,
      title: values.title,
      description: values.description,
      dueDate: values.dueDate,
      assignmentFile: values.assignmentFile,
    }

    // console.log("CREATE TUGAS DATA: ", createFinalReportAssignmentData)

    if (
      !createFinalReportAssignmentData.classId ||
      !createFinalReportAssignmentData.title ||
      !createFinalReportAssignmentData.dueDate ||
      !createFinalReportAssignmentData.assignmentFile
    ) {
      return Swal.fire({
        icon: "error",
        title: "Gagal Tambah Tugas Laporan!",
        text: "Judul Tugas Laporan, Tenggat Waktu, dan File Tugas harus diisi!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
    try {
      await createFinalReportAssignment(
        createFinalReportAssignmentData,
      ).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Tambah Tugas!",
        text: "Selamat Anda berhasil menambah  tugas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR CREATE  TUGAS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Tambah  Tugas!",
        text: "Maaf, Anda gagal tambah tugas!",
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
              Tambah Tugas Laporan Akhir
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="add-assignment-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto py-2  w-full px-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Tugas Laporan</FormLabel>
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
            disabled={
              isLoadingCreateFinalReportAssignment || !isFormValueChanged
            }
            form="add-assignment-form"
            type="submit"
            className="bg-green-500 hover:bg-green-600 gap-x-2 flex items-center">
            {isLoadingCreateFinalReportAssignment && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Tambah
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

MentorCreateFinalReportAssignmentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  classId: PropTypes.string,
}
