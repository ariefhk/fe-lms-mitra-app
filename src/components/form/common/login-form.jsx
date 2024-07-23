import { GradientButton } from "@/components/common/gradient-button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { ROLES } from "@/constants/roles"
import { useLoginMutation } from "@/store/api/auth.api"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const form = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onLoginSubmit(values) {
    try {
      const loginData = {
        username: values?.username,
        password: values?.password,
      }

      console.log("LOGIN DATA: ", loginData)

      const response = await login(values).unwrap()
      // console.log("RESPONSE ON LOGIN SUBMIT: ", response)
      Swal.fire({
        icon: "success",
        title: "Sukses Login!",
        text: "Selamat, Anda berhasil login!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // remake this part to switch case
        switch (response.role) {
          case ROLES.ADMIN:
            return navigate("/admin", { replace: true })
          case ROLES.SENIOR_MENTOR:
            return navigate("/senior-mentor", { replace: true })
          case ROLES.MENTOR:
            return navigate("/mentor", { replace: true })
          case ROLES.MENTEE:
            return navigate("/mentee", { replace: true })
          default:
            return navigate("/", { replace: true })
        }
      })
    } catch (error) {
      console.log("ERROR ON LOGIN SUBMIT: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Login!",
        text: "Maaf, Anda gagal gagal Login!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLoginSubmit)}
        className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-txt18_20 font-light">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukan Username Anda"
                  className="h-[52px] text-txt18_20"
                  required
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
              <FormLabel className="text-txt18_20 font-light">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  required
                  className="h-[52px] text-txt18_20"
                  placeholder="Masukan Password Anda"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <GradientButton
            type="submit"
            isLoading={isLoading}
            className="rounded-[4px] w-full flex gap-x-2 text-[16px]  h-[50px] px-5"
            name="Masuk"
          />
        </div>
      </form>
    </Form>
  )
}
