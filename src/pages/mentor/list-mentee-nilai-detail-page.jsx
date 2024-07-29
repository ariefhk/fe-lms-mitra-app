import DashboardHeader from "@/components/common/dashboard-header"
import MentorEditMenteeAssignmentDialog from "@/components/dialog/mentor/edit-mentee-assignment-dialog"
import MentorEditMenteeFinalReportAssignmentDialog from "@/components/dialog/mentor/edit-mentee-final-report-assignment-dialog"
import MentorListNilaiDetailMenteeTable from "@/components/table/mentor/list-mentee-nilai-detail"
import MentorListNilaiDetailLaporanMenteeTable from "@/components/table/mentor/list-mentee-nilai-detail-laporan-akhir"
import useDialog from "@/hooks/useDialog"
import {
  useFindAllFinalReportMenteeAssignmentQuery,
  useFindAllMenteeAssignmentQuery,
  useFindCalculateMenteeAssignmentGradeQuery,
} from "@/store/api/assignment.api"
import { useFindMenteeByIdQuery } from "@/store/api/mentee.api"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function MentorListMenteeNilaiDetailPage() {
  const { menteeId } = useParams()
  const [choosedAssignment, setChoosedAssignment] = useState(null)

  const {
    isOpenDialog: isOpenEditMenteeAssignmentDialog,
    onOpenDialog: onOpenEditMenteeAssignmentDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditMenteeFinalReportAssignmentDialog,
    onOpenDialog: onOpenEditMenteeFinalReportAssignmentDialog,
  } = useDialog()

  const { data: mentee, isSuccess: isSuccessGetMentee } =
    useFindMenteeByIdQuery(
      {
        menteeId: menteeId,
      },
      {
        skip: !menteeId,
      },
    )

  const {
    data: calculatedMenteeAssignments,
    isSuccess: isSuccessGetCalculatedMenteeAsignments,
  } = useFindCalculateMenteeAssignmentGradeQuery(
    {
      menteeId: menteeId,
    },
    {
      skip: !menteeId,
    },
  )

  const {
    data: menteeAssignments,
    isLoading: isLoadingGetMenteeAssignments,
    isSuccess: isSuccessGetMenteeAssignments,
  } = useFindAllMenteeAssignmentQuery(
    {
      menteeId: menteeId,
    },
    {
      skip: !menteeId,
    },
  )

  const {
    data: menteeFinalReportAssignments,
    isLoading: isLoadingGetMenteeFinalReportAssignments,
    isSuccess: isSuccessGetMenteeFinalReportAssignments,
  } = useFindAllFinalReportMenteeAssignmentQuery({
    menteeId: menteeId,
  })

  function onEditMenteeAssignment(assignment) {
    setChoosedAssignment(assignment)
    onOpenEditMenteeAssignmentDialog(true)
  }
  function onEditMenteeFinalReportAssignment(assignment) {
    setChoosedAssignment(assignment)
    onOpenEditMenteeFinalReportAssignmentDialog(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Detail Nilai Mentee" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-start gap-y-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col  text-txt18_20 gap-y-5">
              <h1>Nama : {isSuccessGetMentee ? mentee?.name : "_"}</h1>
              <p>Email: {isSuccessGetMentee ? mentee?.email : "_"}</p>
              <p>No. Telp: {isSuccessGetMentee ? mentee?.no_telp : "_"}</p>
              <p>Batch: {isSuccessGetMentee ? mentee?.batch : "_"}</p>
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
          <div className="space-y-2">
            <h1 className="text-txt20_30 font-semibold">Laporan Akhir :</h1>
            <MentorListNilaiDetailLaporanMenteeTable
              isLoadingGetMenteeAssignments={
                isLoadingGetMenteeFinalReportAssignments
              }
              isSuccessGetMenteeAssignments={
                isSuccessGetMenteeFinalReportAssignments
              }
              onEditMenteeAssigment={onEditMenteeFinalReportAssignment}
              menteeAssignments={menteeFinalReportAssignments}
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-txt20_30 font-semibold">Daftar Tugas :</h1>
            <MentorListNilaiDetailMenteeTable
              onEditMenteeAssigment={onEditMenteeAssignment}
              isLoadingGetMenteeAssignments={isLoadingGetMenteeAssignments}
              isSuccessGetMenteeAssignments={isSuccessGetMenteeAssignments}
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
      <MentorEditMenteeFinalReportAssignmentDialog
        assignmentId={choosedAssignment?.assignment?.id}
        menteeId={menteeId}
        onClose={() => setChoosedAssignment(null)}
        onOpenChange={onOpenEditMenteeFinalReportAssignmentDialog}
        open={isOpenEditMenteeFinalReportAssignmentDialog}
      />
    </div>
  )
}
