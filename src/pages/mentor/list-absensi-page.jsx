import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminListMenteeTable from "@/components/table/admin/list-mentee"
import { menteeList } from "@/constants/dummy"
import useInput from "@/hooks/useInput"
import { useFindAllMenteeByClassQuery } from "@/store/api/mentee.api"
import { getUser } from "@/store/slices/user.slice"
import { IoMdAdd } from "react-icons/io"
import { useSelector } from "react-redux"

const initialMenteeSearch = {
  name: "",
}

export default function MentorListAbsensiPage() {
  const user = useSelector(getUser)
  const { values: searchMenteeValue, onChange: onChangeSearchMentee } =
    useInput(initialMenteeSearch)

  const {
    data: mentees,
    isLoading: isLoadingGetMentees,
    isSuccess: isSuccessGetMentees,
  } = useFindAllMenteeByClassQuery({
    classId: user?.class?.id,
    name: searchMenteeValue.name,
  })

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Absensi" />
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
              placeholder="Cari Mentee..."
              inputClassName="text-[15px]"
            />
          </div>
          <AdminListMenteeTable
            onDetailMentee={() => {}}
            isLoadingGetMentees={isLoadingGetMentees}
            isSuccessGetMentees={isSuccessGetMentees}
            mentees={mentees}
          />
        </div>
      </main>
    </div>
  )
}
