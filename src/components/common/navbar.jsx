import { getUser } from "@/store/slices/user.slice"
import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
import { HashLink as Link } from "react-router-hash-link"
import { GradientLink } from "./gradient-link"
import SectionWrapper from "./section-wrapper"

function handleToDashboard(role) {
  switch (role) {
    case "ADMIN":
      return "/admin"
    case "SENIOR_MENTOR":
      return "/senior-mentor"
    case "MENTOR":
      return "/mentor"
    case "MENTEE":
      return "/mentee"
  }
}

export default function Navbar() {
  const user = useSelector(getUser)

  console.log(user)

  return (
    <header className="fixed w-full font-poppins top-0 flex items-center h-20  z-20  gap-4  border-b bg-background ">
      <SectionWrapper className="flex items-center justify-between">
        <Link to={"/"}>
          <img
            src="/images/logo-black.png"
            alt=""
            className="w-[140px] h-[70px] flex-shrink-0"
          />
        </Link>

        <div className="md:flex hidden items-center gap-[50px]  w-max">
          <Link
            to="/"
            className="text-black text-txt18_20 font-medium hover:bg-gradient-to-r hover:from-cyan-400  hover:to-purple-900 hover:inline-block hover:text-transparent hover:bg-clip-text">
            Beranda
          </Link>
          <Link
            to="/#tentang-kami"
            className="text-black text-txt18_20 font-medium  hover:bg-gradient-to-r hover:from-cyan-400  hover:to-purple-900 hover:inline-block hover:text-transparent hover:bg-clip-text">
            Tentang Kami
          </Link>
          <Link
            to="/#contact"
            className="text-black text-txt18_20 font-medium  hover:bg-gradient-to-r hover:from-cyan-400  hover:to-purple-900 hover:inline-block hover:text-transparent hover:bg-clip-text">
            Kontak
          </Link>
          {Object.keys(user).length > 0 ? (
            <GradientLink
              to={handleToDashboard(user.role)}
              name="Dashboard"
              className="w-[160px]  rounded-full text-[18px] flex gap-x-2 h-[45px] p-0"
              iconClassName="w-6 h-6"
            />
          ) : (
            <GradientLink
              to="/login"
              name="Masuk"
              className="w-[160px]  rounded-full text-[18px] flex gap-x-2 h-[45px] p-0"
              iconClassName="w-6 h-6"
            />
          )}
        </div>
      </SectionWrapper>
    </header>
  )
}
