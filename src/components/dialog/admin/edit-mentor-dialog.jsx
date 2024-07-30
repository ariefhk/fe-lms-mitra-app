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
import { getImageURL } from "@/lib/getImage"
import { useUpdateMentorMutation } from "@/store/api/mentor.api"
import { useFindAllSeniorMentorQuery } from "@/store/api/senior-mentor.api"
import { Check, ChevronsUpDown } from "lucide-react"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminEditMentorDialog({
  open = false,
  onOpenChange,
  onClose,
  mentor,
}) {
  const [previewProfilePicture, setPreviewProfilePicture] = useState(null)
  const [updateMentor, { isLoading: isLoadingUpdateMentor }] =
    useUpdateMentorMutation()

  const {
    isOpenDialog: isOpenSeniorMentorListDialog,
    onOpenDialog: onOpenSeniorMentorListDialog,
  } = useDialog()

  const {
    data: seniorMentors,
    isLoading: isLoadingGetSeniorMentors,
    isSuccess: isSuccessGetSeniorMentors,
  } = useFindAllSeniorMentorQuery({
    name: "",
  })

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      no_telp: "",
      username: "",
      password: "",
      profilePicture: "",
      seniorMentorId: "",
    },
  })

  useEffect(() => {
    form.reset({
      name: mentor?.name,
      email: mentor?.email,
      no_telp: mentor?.no_telp,
      username: mentor?.username,
      seniorMentorId: mentor?.seniorMentor?.id,
    })
    if (mentor?.profilePicture) {
      setPreviewProfilePicture(getImageURL(mentor?.profilePicture))
    }
  }, [form, mentor])

  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const updateMentorData = {
      mentorId: mentor?.id,
      name: values.name,
      no_telp: values.no_telp,
      email: values.email,
      username: values.username,
      password: values.password,
      profilePicture: values.profilePicture,
      seniorMentorId: values?.seniorMentorId,
    }
    try {
      await updateMentor(updateMentorData).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Update Mentor!",
        text: "Selamat Anda berhasil mengupdate mentor!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR UPDATE MENTOR: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Update Mentor!",
        text: "Maaf, Anda gagal mengupdate mentor!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for adding mentor.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
              Ubah Mentor
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="update-mentor-form"
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
                        placeholder="Masukan nama senior mentor"
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
                        placeholder="Masukan email senior mentor"
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
                        placeholder="Masukan no telp senior mentor"
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
                        placeholder="Masukan username senior mentor"
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
                        placeholder="Masukan password senior mentor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seniorMentorId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" font-light">Pilih Mentor</FormLabel>
                    <Popover
                      open={isOpenSeniorMentorListDialog}
                      onOpenChange={onOpenSeniorMentorListDialog}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between">
                          {isLoadingGetSeniorMentors &&
                            "Sedang Memuat Senior Mentor..."}
                          {!isLoadingGetSeniorMentors &&
                            (isSuccessGetSeniorMentors && field?.value
                              ? seniorMentors.find(
                                  (sm) => sm.id === field?.value,
                                )?.name
                              : "Pilih Senior Mentor...")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Senior Mentor..." />
                          <CommandEmpty>
                            Senior Mentor tidak ditemukan.
                          </CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {isLoadingGetSeniorMentors &&
                                "Sedang Memuat Senior Mentor..."}
                              {isSuccessGetSeniorMentors &&
                                !isLoadingGetSeniorMentors &&
                                seniorMentors.map((t, index) => {
                                  return (
                                    <CommandItem
                                      key={index + 1}
                                      value={t.name}
                                      onSelect={() => {
                                        form.setValue("seniorMentorId", t.id, {
                                          shouldDirty: true,
                                        })
                                        onOpenSeniorMentorListDialog(false)
                                      }}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field?.value === t.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {t.name}
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
            disabled={isLoadingUpdateMentor || !isFormValueChanged}
            form="update-mentor-form"
            type="submit"
            className="bg-green-500 hover:bg-green-600 gap-x-2 flex items-center">
            {isLoadingUpdateMentor && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Simpan
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminEditMentorDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  mentor: PropTypes.object,
}
