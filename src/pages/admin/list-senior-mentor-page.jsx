import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminListSeniorMentorTable from "@/components/table/admin/list-senior-mentor"
import { seniorMentorList } from "@/constants/dummy"
import { IoMdAdd } from "react-icons/io"

export default function AdminListSeniorMentorPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Senior Mentor" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientButton
              className="w-[184px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
              name="Tambah Data"
              iconClassName="w-6 h-6"
              Icon={IoMdAdd}
            />
            <GradientInput
              placeholder="Cari Senior Mentor..."
              inputClassName="text-[15px]"
            />
          </div>

          <AdminListSeniorMentorTable
            onDeleteSeniorMentor={() => {}}
            onEditSeniorMentor={() => {}}
            isLoadingGetSeniorMentors={false}
            isSuccessGetSeniorMentors={true}
            seniorMentors={seniorMentorList}
          />
        </div>
      </main>
    </div>
  )
}
