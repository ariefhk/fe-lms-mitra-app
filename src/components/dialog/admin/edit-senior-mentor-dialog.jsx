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
import { Input, PasswordInput } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { getImageURL } from "@/lib/getImage"
import { useUpdateSeniorMentorMutation } from "@/store/api/senior-mentor.api"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminEditSeniorMentorDialog({
  open = false,
  onOpenChange,
  onClose,
  seniorMentor,
}) {
  const [previewProfilePicture, setPreviewProfilePicture] = useState(null)
  const [updateSeniorMentor, { isLoading: isLoadingUpdateSeniorMentor }] =
    useUpdateSeniorMentorMutation()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      no_telp: "",
      username: "",
      password: "",
      profilePicture: "",
    },
  })

  useEffect(() => {
    form.reset({
      name: seniorMentor?.name,
      email: seniorMentor?.email,
      no_telp: seniorMentor?.no_telp,
      username: seniorMentor?.username,
    })
    if (seniorMentor?.profilePicture) {
      setPreviewProfilePicture(getImageURL(seniorMentor?.profilePicture))
    }
  }, [form, seniorMentor])

  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const updateSeniorMentorData = {
      seniorMentorId: seniorMentor?.id,
      name: values.name,
      no_telp: values.no_telp,
      email: values.email,
      username: values.username,
      password: values.password,
      profilePicture: values.profilePicture,
    }
    try {
      await updateSeniorMentor(updateSeniorMentorData).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Update Senior Mentor!",
        text: "Selamat Anda berhasil mengupdate senior mentor!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR UPDATE SENIOR MENTOR: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Update Senior Mentor!",
        text: "Maaf, Anda gagal update senior mentor!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for adding senior mentor.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-semibold  bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
              Ubah Senior Mentor
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="add-senior-mentor-form"
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
                        placeholder="Masukan password terbaru senior mentor"
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
              className="bg-color-1 text-white hover:text-white hover:bg-color-1/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isLoadingUpdateSeniorMentor || !isFormValueChanged}
            form="add-senior-mentor-form"
            type="submit"
            className="bg-green-500 hover:bg-green-600gap-x-2 flex items-center">
            {isLoadingUpdateSeniorMentor && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Simpan
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminEditSeniorMentorDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  seniorMentor: PropTypes.object,
}
