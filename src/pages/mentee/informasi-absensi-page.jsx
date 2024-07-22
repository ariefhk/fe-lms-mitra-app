import DashboardHeader from "@/components/common/dashboard-header"
import { GradientInput } from "@/components/common/gradient-input"
import MentorListMenteeTable from "@/components/table/mentor/list-mentee"
import { menteeList } from "@/constants/dummy"

export default function MenteeInformasiAbsensiPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Mentee" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientInput
              placeholder="Cari Mentee..."
              inputClassName="text-[15px]"
            />
          </div>
          <MentorListMenteeTable
            onDetailMentee={() => {}}
            isLoadingGetMentees={false}
            isSuccessGetMentees={true}
            mentees={menteeList}
          />
        </div>
      </main>
    </div>
  )
}
