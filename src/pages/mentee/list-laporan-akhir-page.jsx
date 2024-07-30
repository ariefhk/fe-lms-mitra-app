import DashboardHeader from "@/components/common/dashboard-header"
import { useFindAllFinalReportMenteeAssignmentQuery } from "@/store/api/assignment.api"
import { getUser } from "@/store/slices/user.slice"
import { useSelector } from "react-redux"
import { MenteeAssignmentList } from "./list-tugas-page"

export default function MenteeListLaporanAkhirPage() {
  const user = useSelector(getUser)

  const {
    data: finalReportMenteeAssignments,
    isLoading: isLoadingGetFinalReportMenteeAssignments,
    isSuccess: isSuccessGetFinalReportMenteeAssignments,
  } = useFindAllFinalReportMenteeAssignmentQuery(
    {
      menteeId: user.id,
    },
    {
      skip: !user.id,
    },
  )

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Tugas Laporan Akhir" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="space-y-5">
          <div className="space-y-1 font-base">
            <h1>
              Semua laporan akhir di kumpulkan sebelum program studi independen
              berakhir.
            </h1>
            <p>
              Berikut laporan yang harus dikerjakan ketika program berlangsung:
            </p>
          </div>
          <p className="font-semibold text-txt18_20">
            Kamu mempunyai{" "}
            <span className="underline underline-offset-4 pr-1">
              {" "}
              {isSuccessGetFinalReportMenteeAssignments
                ? finalReportMenteeAssignments.length
                : 0}
            </span>
            Laporan Akhir yang harus dikumpulkan:
          </p>
        </div>
        <div className="flex flex-col  gap-y-5">
          <MenteeAssignmentList
            isFinalReport={true}
            assignments={finalReportMenteeAssignments}
            isLoadingGetAssignments={isLoadingGetFinalReportMenteeAssignments}
            isSuccessGetAssignments={isSuccessGetFinalReportMenteeAssignments}
          />
        </div>
      </main>
    </div>
  )
}
