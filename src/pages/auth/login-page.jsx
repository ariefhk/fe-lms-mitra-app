import LoginForm from "@/components/form/common/login-form"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="w-full lg:grid  h-screen lg:grid-cols-2 lg:overflow-hidden overflow-y-auto">
      <div className="bg-color-1 hidden lg:flex  items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/person-auth.png"
            alt=""
            className="max-w-[400px] w-full max-h-[500px] h-full"
          />
          <h1 className="text-center text-txt16_24 text-white font-poppins">
            Selamat datang di website kami, tempat di mana pembelajaran <br />{" "}
            menjadi sebuah perjalanan yang penuh inspirasi.
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center py-12  overflow-y-auto">
        <div className="mx-auto grid font-poppins bg-color-2 w-[500px] h-[500px] gap-6 border rounded-[30px] px-[30px] py-3">
          <div className="grid gap-2 text-center">
            <h1 className="text-txt24_36 ">Masuk untuk Memulai Sesi Anda</h1>
          </div>
          <LoginForm />
          <div className="flex items-center gap-2 max-w-[500px]">
            <Separator className="w-[200px]" />
            <span className="text-txt14_20 text-slate-500">Atau</span>
            <Separator className="w-[200px]" />
          </div>
          <div className="mt-4 text-center text-txt18_20 font-light">
            Kembali ke
            <Link
              to="/"
              className="hover:underline hover:underline-offset-4 pl-2 font-normal">
              Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
