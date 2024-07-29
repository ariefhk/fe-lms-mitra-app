import DashboardHeader from "@/components/common/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"
import { useFindAllMenteeAssignmentQuery } from "@/store/api/assignment.api"
import { getUser } from "@/store/slices/user.slice"
import { MdAssignmentTurnedIn } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function AssignmentStatus({ status, isFinalReport }) {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="text-green-600 text-sm font-medium group-hover:text-white">
          {isFinalReport ? "Laporan" : "Tugas"} Anda Sudah dinilai !
        </span>
      )
    case "PENDING":
      return (
        <span className="text-yellow-500 text-sm font-medium group-hover:text-white">
          {isFinalReport ? "Laporan" : "Tugas"} Anda Sedang di review Mentor !
        </span>
      )
    case "REVISION":
      return (
        <span className="text-rose-600 text-sm font-medium group-hover:text-white">
          {isFinalReport ? "Laporan" : "Tugas"} Anda terdapat Revisi !
        </span>
      )
    case "UNCOMPLETED":
      return (
        <span className="text-rose-600 text-sm font-medium group-hover:text-white">
          Anda belum mengumpulkan {isFinalReport ? "Laporan" : "Tugas"} !
        </span>
      )
  }
}

export function MenteeAssignmentList({
  isFinalReport = false,
  assignments,
  isLoadingGetAssignments,
  isSuccessGetAssignments,
}) {
  let assignmentList

  if (
    !isLoadingGetAssignments &&
    isSuccessGetAssignments &&
    assignments.length > 0
  ) {
    assignmentList = assignments.map((assgn, index) => {
      return (
        <Link
          to={`/mentee/tugas/${assgn?.assignment?.id}`}
          key={index + 1}
          className="group border max-w-[800px] rounded-lg h-[50px] p-3 hover:bg-color-1 bg-none text-cyan-500 hover:text-white flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-x-3">
            <MdAssignmentTurnedIn className="flex-shrink-0 w-6 h-6" />{" "}
            <span>{assgn?.assignment?.title}</span>
          </div>
          {
            <AssignmentStatus
              isFinalReport={isFinalReport}
              status={assgn?.status}
            />
          }
        </Link>
      )
    })
  } else if (isLoadingGetAssignments) {
    assignmentList = Array.from({ length: 3 }).map((_, index) => {
      return (
        <Skeleton
          key={index + 1}
          className="max-w-[800px] h-[50px] rounded-lg p-3  flex items-center justify-between cursor-pointer"
        />
      )
    })
  } else {
    assignmentList = <div>Sedang Memuat...</div>
  }

  return assignmentList
}

export default function MenteeListTugasPage() {
  const user = useSelector(getUser)

  const {
    data: menteeAssignments,
    isLoading: isLoadingGetMenteeAssignments,
    isSuccess: isSuccessGetMenteeAssignments,
  } = useFindAllMenteeAssignmentQuery(
    {
      menteeId: user.id,
    },
    {
      skip: !user.id,
    },
  )

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Tugas" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="space-y-5">
          <div className="space-y-1 font-base">
            <h1>
              Semua tugas di kumpulkan sebelum program studi independen
              berakhir.
            </h1>
            <p>
              Berikut tugas yang harus dikerjakan selama program berlangsung:
            </p>
          </div>
          <p className="font-semibold text-txt18_20">
            Kamu mempunyai{" "}
            {isSuccessGetMenteeAssignments ? menteeAssignments.length : 0}{" "}
            Tugas:
          </p>
        </div>
        <div className="flex flex-col  gap-y-5">
          <MenteeAssignmentList
            assignments={menteeAssignments}
            isLoadingGetAssignments={isLoadingGetMenteeAssignments}
            isSuccessGetAssignments={isSuccessGetMenteeAssignments}
          />
        </div>
      </main>
    </div>
  )
}
