import DashboardHeader from "@/components/common/dashboard-header"
import { MdAssignmentTurnedIn } from "react-icons/md"
import { Link, useParams } from "react-router-dom"

function MenteeListTask() {
  return Array.from({ length: 5 }).map((_, index) => {
    return (
      <Link
        to={`/mentee/tugas/${index + 1}`}
        key={index + 1}
        className="group border max-w-[800px] rounded-lg p-3 hover:bg-color-1 bg-none text-cyan-500 hover:text-white flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-x-3">
          <MdAssignmentTurnedIn className="flex-shrink-0 w-6 h-6" />{" "}
          <span>Tugas {index + 1}</span>
        </div>
        <span className="text-rose-600 text-sm font-medium group-hover:text-white">
          Anda Belum mengumpulkan Tugas !
        </span>
      </Link>
    )
  })
}

export default function MenteeTugasDetailPage() {
  const { assignmentId } = useParams()

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Tugas" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="space-y-3">
          <div className="space-y-3">
            <h1>
              Semua tugas di kumpulkan sebelum program studi independen
              berakhir.
            </h1>
            <p>
              Berikut tugas yang harus dikerjakan selama program berlangsung:
            </p>
          </div>
          <p>Kamu mempunyai 10 Tugas:</p>
        </div>
        <div className="flex flex-col  gap-y-5">
          <MenteeListTask />
        </div>
      </main>
    </div>
  )
}
