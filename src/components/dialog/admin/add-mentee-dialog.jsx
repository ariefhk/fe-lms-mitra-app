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
import { Input, PasswordInput } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import useDialog from "@/hooks/useDialog"
import { cn } from "@/lib/class-merge"
import { useFindAllClassQuery } from "@/store/api/class.api"
import { useCreateMenteeMutation } from "@/store/api/mentee.api"
import { Check, ChevronsUpDown } from "lucide-react"
import PropTypes from "prop-types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminCreateMenteeDialog({
  open = false,
  onOpenChange,
  onClose,
}) {
  const [previewProfilePicture, setPreviewProfilePicture] = useState(null)
  const [createMentee, { isLoading: isLoadingCreateMentee }] =
    useCreateMenteeMutation()

  const {
    isOpenDialog: isOpenClassListDialog,
    onOpenDialog: onOpenClassListDialog,
  } = useDialog()

  const {
    data: classes,
    isLoading: isLoadingGetClasses,
    isSuccess: isSuccessGetClasses,
  } = useFindAllClassQuery({
    name: "",
  })

  const form = useForm({
    defaultValues: {
      name: "",
      batch: "",
      major: "",
      email: "",
      university: "",
      username: "",
      password: "",
      profilePicture: "",
      classId: "",
    },
  })

  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const createMenteeData = {
      name: values.name,
      no_telp: values.no_telp,
      batch: values.batch,
      major: values.major,
      university: values.university,
      email: values.email,
      classId: values.classId,
      username: values.username,
      password: values.password,
      profilePicture: values.profilePicture,
    }

    if (
      !createMenteeData?.name ||
      !createMenteeData?.classId ||
      !createMenteeData?.username ||
      !createMenteeData?.password ||
      !createMenteeData?.profilePicture
    ) {
      return Swal.fire({
        icon: "error",
        title: "Gagal Tambah Mentee!",
        text: "Nama, Kelas, Username, Password dan Foto Profile harus diisi!",
        showConfirmButton: false,
        timer: 1500,
      })
    }

    try {
      await createMentee(createMenteeData).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Tambah Mentee!",
        text: "Selamat Anda berhasil menambah mentee!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR CREATE MENTEE: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Tambah Mentee!",
        text: "Maaf, Anda gagal tambah mentee!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for adding mentee.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
              Tambah Mentee
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="add-mentee-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto py-2  w-full px-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukan nama mentee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukan email mentee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_telp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Telepon</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukan no telp mentee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukan batch"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukan major"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Universitas</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukan Universitas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {previewProfilePicture && (
                <img
                  src={previewProfilePicture}
                  className="w-[200px] h-[200px]"
                />
              )}
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Foto Profile</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={value?.fileName}
                        onChange={(event) => {
                          const file = event?.target?.files[0]
                          if (!file) {
                            return
                          }
                          setPreviewProfilePicture(URL.createObjectURL(file))
                          onChange(file)
                        }}
                        type="file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukan username mentee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Masukan password mentee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Pilih Kelas</FormLabel>
                    <Popover
                      open={isOpenClassListDialog}
                      onOpenChange={onOpenClassListDialog}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between">
                          {isLoadingGetClasses && "Sedang Memuat Kelas..."}
                          {!isLoadingGetClasses &&
                            (isSuccessGetClasses && field?.value
                              ? classes.find((sm) => sm.id === field?.value)
                                  ?.name
                              : "Pilih Kelas...")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Kelas..." />
                          <CommandEmpty>Kelas tidak ditemukan.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {isLoadingGetClasses && "Sedang Memuat Kelas..."}
                              {isSuccessGetClasses &&
                                !isLoadingGetClasses &&
                                classes.map((t, index) => {
                                  return (
                                    <CommandItem
                                      key={index + 1}
                                      value={t.name}
                                      onSelect={() => {
                                        form.setValue("classId", t.id, {
                                          shouldDirty: true,
                                        })
                                        onOpenClassListDialog(false)
                                      }}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field?.value === t.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {t?.name}
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
            disabled={isLoadingCreateMentee || !isFormValueChanged}
            form="add-mentee-form"
            type="submit"
            className="bg-green-500 hover:bg-green-600 gap-x-2 flex items-center">
            {isLoadingCreateMentee && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Tambah
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminCreateMenteeDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
}
