import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import MentorListNilaiDetailMenteeTable from "@/components/table/mentor/list-mentee-nilai-detail"
import MentorListNilaiDetailLaporanMenteeTable from "@/components/table/mentor/list-mentee-nilai-detail-laporan-akhir"
// import { menteeFinalReportAsignment } from "@/constants/dummy/mentor-page.dummy"
// import {
//   useFindAllMenteeAssignmentQuery,
//   useFindAllMenteeFinalReportAssignmentQuery,
// } from "@/store/api/assignment.api"
import { IoMdAdd } from "react-icons/io"
import { useParams } from "react-router-dom"

export default function MentorListMenteeNilaiDetailPage() {
  const { menteeId } = useParams()

  // const {
  //   data: menteeAssignments,
  //   isLoading: isLoadingGetMenteeAssignments,
  //   isSuccess: isSuccessGetMenteeAsignments,
  // } = useFindAllMenteeAssignmentQuery({
  //   menteeId: menteeId,
  // })

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
            <GradientButton
              className="w-[184px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
              name="Edit Nilai"
              iconClassName="w-6 h-6"
              Icon={IoMdAdd}
            />
          </div>
          <div>
            <h1 className="text-txt20_30 font-semibold">
              Nilai Akhir : <span className="text-txt36_40">80</span>
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
          <div className="space-y-2">
            <h1 className="text-txt20_30 font-semibold">Daftar Tugas :</h1>
            <MentorListNilaiDetailMenteeTable
              onEditMenteeAssigment={() => {}}
              isLoadingGetMenteeAssignments={isLoadingGetMenteeAssignments}
              isSuccessGetMenteeAssignments={isSuccessGetMenteeAsignments}
              menteeAssignments={menteeAssignments}
            />
          </div> */}
        </div>
      </main>
    </div>
  )
}
