import DashboardHeader from "@/components/common/dashboard-header"
import MenteeListNilaiMenteeTable from "@/components/table/mentee/list-nilai"
import {
  useFindAllMenteeAssignmentQuery,
  useFindCalculateMenteeAssignmentGradeQuery,
} from "@/store/api/assignment.api"
import { getUser } from "@/store/slices/user.slice"
import { useSelector } from "react-redux"

export default function MenteeInformasiNilaiPage() {
  const user = useSelector(getUser)

  const {
    data: menteeAssignments,
    isLoading: isLoadingGetMenteeAssignments,
    isSuccess: isSuccessGetMenteeAssignments,
  } = useFindAllMenteeAssignmentQuery(
    {
      menteeId: user?.id,
    },
    {
      skip: !user?.id,
    },
  )

  const {
    data: calculatedMenteeAssignments,
    isSuccess: isSuccessGetCalculatedMenteeAsignments,
  } = useFindCalculateMenteeAssignmentGradeQuery(
    {
      menteeId: user?.id,
    },
    {
      skip: !user?.id,
    },
  )

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Nilai Mentee" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:px-6 lg:pb-6 lg:pt-16">
        <MenteeListNilaiMenteeTable
          isLoadingGetMenteeAssignments={isLoadingGetMenteeAssignments}
          isSuccessGetMenteeAssignments={isSuccessGetMenteeAssignments}
          isSuccessGetCalculatedMenteeAsignments={
            isSuccessGetCalculatedMenteeAsignments
          }
          totalGrade={calculatedMenteeAssignments?.totalGrade}
          menteeAssignments={menteeAssignments}
        />
      </main>
    </div>
  )
}
