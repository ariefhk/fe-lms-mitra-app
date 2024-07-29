import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import MentorEditMenteeAssignmentDialog from "@/components/dialog/mentor/edit-mentee-assignment-dialog"
import MentorListNilaiDetailMenteeTable from "@/components/table/mentor/list-mentee-nilai-detail"
import MentorListNilaiDetailLaporanMenteeTable from "@/components/table/mentor/list-mentee-nilai-detail-laporan-akhir"
import useDialog from "@/hooks/useDialog"
import {
  useFindAllMenteeAssignmentQuery,
  useFindCalculateMenteeAssignmentGradeQuery,
} from "@/store/api/assignment.api"
import { useState } from "react"
// import { menteeFinalReportAsignment } from "@/constants/dummy/mentor-page.dummy"
// import {
//   useFindAllMenteeAssignmentQuery,
//   useFindAllMenteeFinalReportAssignmentQuery,
// } from "@/store/api/assignment.api"
import { IoMdAdd } from "react-icons/io"
import { useParams } from "react-router-dom"

export default function MentorListMenteeNilaiDetailPage() {
  const { menteeId } = useParams()
  const [choosedAssignment, setChoosedAssignment] = useState(null)
  const {
    isOpenDialog: isOpenEditMenteeAssignmentDialog,
    onOpenDialog: onOpenEditMenteeAssignmentDialog,
  } = useDialog()
  const {
    data: calculatedMenteeAssignments,
    isSuccess: isSuccessGetCalculatedMenteeAsignments,
  } = useFindCalculateMenteeAssignmentGradeQuery({
    menteeId: menteeId,
  })

  const {
    data: menteeAssignments,
    isLoading: isLoadingGetMenteeAssignments,
    isSuccess: isSuccessGetMenteeAsignments,
  } = useFindAllMenteeAssignmentQuery({
    menteeId: menteeId,
  })

  function onEditMenteeAssignment(assignment) {
    setChoosedAssignment(assignment)
    onOpenEditMenteeAssignmentDialog(true)
  }

  console.log(menteeAssignments)

  // const {
  //   data: menteeFinalReportAssignments,
  //   isLoading: isLoadingGetMenteeFinalReportAssignments,
  //   isSuccess: isSuccessGetMenteeFinalReportAsignments,
  // } = useFindAllMenteeFinalReportAssignmentQuery({
  //   menteeId: menteeId,
  // })

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Detail Nilai Mentee" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-start gap-y-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col  text-txt18_20 gap-y-5">
              <h1>Nama : Arief Rachman Hakim</h1>
              <p>Email: arief@gmail.com</p>
              <p>No. Telp: 08123456789</p>
              <p>Batch: 1</p>
            </div>
          </div>
          <div>
            <h1 className="text-txt20_30 font-semibold">
              Nilai Akhir :{" "}
              <span className="text-txt36_40">
                {isSuccessGetCalculatedMenteeAsignments
                  ? calculatedMenteeAssignments?.totalGrade
                  : "_"}
              </span>
            </h1>
          </div>
          {/* <div className="space-y-2">
            <h1 className="text-txt20_30 font-semibold">Laporan Akhir :</h1>
            <MentorListNilaiDetailLaporanMenteeTable
              isLoadingGetMenteeAssignments={
                isLoadingGetMenteeFinalReportAssignments
              }
              isSuccessGetMenteeAssignments={
                isSuccessGetMenteeFinalReportAsignments
              }
              onEditMenteeAssigment={() => {}}
              menteeAssignments={menteeFinalReportAssignments}
            />
          </div>
           */}
          <div className="space-y-2">
            <h1 className="text-txt20_30 font-semibold">Daftar Tugas :</h1>
            <MentorListNilaiDetailMenteeTable
              onEditMenteeAssigment={onEditMenteeAssignment}
              isLoadingGetMenteeAssignments={isLoadingGetMenteeAssignments}
              isSuccessGetMenteeAssignments={isSuccessGetMenteeAsignments}
              menteeAssignments={menteeAssignments}
            />
          </div>
        </div>
      </main>
      <MentorEditMenteeAssignmentDialog
        assignmentId={choosedAssignment?.assignment?.id}
        menteeId={menteeId}
        onClose={() => setChoosedAssignment(null)}
        onOpenChange={onOpenEditMenteeAssignmentDialog}
        open={isOpenEditMenteeAssignmentDialog}
      />
    </div>
  )
}
