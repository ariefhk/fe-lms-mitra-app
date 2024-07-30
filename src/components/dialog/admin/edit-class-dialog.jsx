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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import useDialog from "@/hooks/useDialog"
import { cn } from "@/lib/class-merge"
import { useUpdateClassMutation } from "@/store/api/class.api"
import { useFindAllMentorQuery } from "@/store/api/mentor.api"
import { Check, ChevronsUpDown } from "lucide-react"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminEditClassDialog({
  open = false,
  onOpenChange,
  classes,
  onClose,
}) {
  const [updateClass, { isLoading: isLoadingUpdateClass }] =
    useUpdateClassMutation()

  const {
    isOpenDialog: isOpenListMentorDialog,
    onOpenDialog: onOpenListMentorDialog,
  } = useDialog()

  const {
    data: mentors,
    isLoading: isLoadingGetMentor,
    isSuccess: isSuccessGetMentor,
  } = useFindAllMentorQuery({
    name: "",
  })

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      mentorId: "",
    },
  })

  useEffect(() => {
    form.reset({
      mentorId: classes?.mentor?.id,
      name: classes?.name,
      description: classes?.description,
    })
  }, [form, classes])

  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const createClassData = {
      classId: classes?.id,
      name: values.name,
      description: values.description,
      mentorId: values.mentorId,
    }

    try {
      await updateClass(createClassData).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Ubah Kelas!",
        text: "Selamat Anda berhasil mengubah Kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR UPDATE Kelas: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Ubah Kelas!",
        text: "Maaf, Anda gagal mengubah Kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for updating class.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
              Ubah Kelas
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="add-class-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto py-2 px-1 w-full  space-y-6 text-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kelas</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukan nama kelas"
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
                    <FormLabel>Deskripsi Kelas</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Deskripsi Kelas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mentorId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Pilih Mentor</FormLabel>
                    <Popover
                      open={isOpenListMentorDialog}
                      onOpenChange={onOpenListMentorDialog}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between">
                          {isLoadingGetMentor && "Sedang Memuat Mentor..."}
                          {!isLoadingGetMentor &&
                            (isSuccessGetMentor && field?.value
                              ? mentors.find((sm) => sm.id === field?.value)
                                  ?.name
                              : "Pilih Mentor...")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Mentor..." />
                          <CommandEmpty>Mentor tidak ditemukan.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {isLoadingGetMentor && "Sedang Memuat Mentor..."}
                              {isSuccessGetMentor &&
                                !isLoadingGetMentor &&
                                mentors.map((t, index) => {
                                  return (
                                    <CommandItem
                                      key={index + 1}
                                      value={t.name}
                                      onSelect={() => {
                                        const isHaveClass = t?.class?.id
                                        if (!isHaveClass) {
                                          form.setValue("mentorId", t.id, {
                                            shouldDirty: true,
                                          })
                                          onOpenListMentorDialog(false)
                                        }
                                      }}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field?.value === t.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {t?.class?.id
                                        ? `${t.name} sudah punya kelas`
                                        : t.name}
                                    </CommandItem>
                                  )
                                })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
            disabled={isLoadingUpdateClass || !isFormValueChanged}
            form="add-class-form"
            type="submit"
            className="bg-green-500 hover:bg-green-600">
            {isLoadingUpdateClass && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Ubah
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminEditClassDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  classes: PropTypes.object,
}
