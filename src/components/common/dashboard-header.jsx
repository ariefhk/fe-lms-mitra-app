import LogoutButton from "./logout-button"

export default function DashboardHeader({ title = "Dashboard" }) {
  return (
    <header className="flex h-14 sticky top-0 bg-white z-20 items-center justify-between  gap-4 border-b-2 border-black/20  px-4 lg:h-[80px] lg:px-6">
      <h1 className="text-txt24_36 font-semibold bg-gradient-to-r from-cyan-400  to-[#8A3DFF]  text-transparent bg-clip-text">
        {title}
      </h1>
      <LogoutButton />
    </header>
  )
}
