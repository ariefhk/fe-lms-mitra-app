import LogoutButton from "@/components/common/logout-button"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 sticky top-0 bg-white z-20 items-center justify-between  gap-4 border-b-2 border-black/20  px-4 lg:h-[80px] lg:px-6">
        <h1 className="text-txt24_36 font-semibold bg-gradient-to-r from-cyan-400  to-purple-900  text-transparent bg-clip-text">
          Dashboard Admin
        </h1>
        <LogoutButton />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <h1>Hi</h1>
      </main>
    </div>
  )
}
