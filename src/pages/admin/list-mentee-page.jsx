import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminListMenteeTable from "@/components/table/admin/list-mentee"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindAllMenteeQuery } from "@/store/api/mentee.api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialMenteeSearch = {
  name: "",
}

export default function AdminListMenteePage() {
  const [choosedMentee, seChoosedMentee] = useState(null)

  const {
    isOpenDialog: isOpenCreateMenteeDialog,
    onOpenDialog: onOpenCreateMenteeDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditMenteeDialog,
    onOpenDialog: onOpenEditMenteeDialog,
  } = useDialog()
  const {
    isOpenDialog: isOpenDeleteMenteeDialog,
    onOpenDialog: onOpenDeleteMenteeDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenDetailMenteeDialog,
    onOpenDialog: onOpenDetailMenteeDialog,
  } = useDialog()
  const { values: searchMenteeSearch, onChange: onChangeMenteeSearch } =
    useInput(initialMenteeSearch)

  const {
    data: mentees,
    isLoading: isLoadingGetMentees,
    isSuccess: isSuccessGetMentees,
  } = useFindAllMenteeQuery({
    name: searchMenteeSearch.name,
  })

  function onDetailMentee(mentee) {
    seChoosedMentee(mentee)
    onOpenDetailMenteeDialog(true)
  }
  function onEditMentee(mentee) {
    seChoosedMentee(mentee)
    onOpenEditMenteeDialog(true)
  }
  function onDeleteMentee(mentee) {
    seChoosedMentee(mentee)
    onOpenDeleteMenteeDialog(true)
  }
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Mentee" />
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
              name="name"
              value={searchMenteeSearch.name}
              onChange={onChangeMenteeSearch}
            />
          </div>
          <AdminListMenteeTable
            onDeleteMentee={() => {}}
            onEditMentee={() => {}}
            isLoadingGetMentees={isLoadingGetMentees}
            isSuccessGetMentees={isSuccessGetMentees}
            mentees={mentees}
          />
        </div>
      </main>
    </div>
  )
}
