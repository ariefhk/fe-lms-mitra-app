import DashboardHeader from "@/components/common/dashboard-header"
import { GradientInput } from "@/components/common/gradient-input"
import MentorListNilaiMenteeTable from "@/components/table/mentor/list-mentee-nilai"
import { menteeList } from "@/constants/dummy"

export default function MentorListMenteeNilaiPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Nilai Mentee" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientInput
              placeholder="Cari Mentee..."
              inputClassName="text-[15px]"
            />
          </div>
          <MentorListNilaiMenteeTable
            isLoadingGetMentees={false}
            isSuccessGetMentees={true}
            mentees={menteeList}
          />
        </div>
      </main>
    </div>
  )
}
