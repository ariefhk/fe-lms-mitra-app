import DashboardHeader from "@/components/common/dashboard-header"
import { GradientInput } from "@/components/common/gradient-input"
import SeniorMentorListMentorTable from "@/components/table/senior-mentor/list-mentor"
import { mentorList } from "@/constants/dummy"

export default function SeniorMentorListMentorPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Mentor" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientInput
              placeholder="Cari Mentor..."
              inputClassName="text-[15px]"
            />
          </div>
          <SeniorMentorListMentorTable
            onDetailMentor={() => {}}
            isLoadingGetMentors={false}
            isSuccessGetMentors={true}
            mentors={mentorList}
          />
        </div>
      </main>
    </div>
  )
}
