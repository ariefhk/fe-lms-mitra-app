import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminCreateMenteeDialog from "@/components/dialog/admin/add-mentee-dialog"
import AdminDeleteMenteeDialog from "@/components/dialog/admin/delete-mentee-dialog"
import AdminEditMenteeDialog from "@/components/dialog/admin/edit-mentee-dialog"
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
  const [choosedMentee, setChoosedMentee] = useState(null)

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
    setChoosedMentee(mentee)
    onOpenDetailMenteeDialog(true)
  }
  function onEditMentee(mentee) {
    setChoosedMentee(mentee)
    onOpenEditMenteeDialog(true)
  }
  function onDeleteMentee(mentee) {
    setChoosedMentee(mentee)
    onOpenDeleteMenteeDialog(true)
  }
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Mentee" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientButton
              onClick={() => onOpenCreateMenteeDialog(true)}
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
            onDeleteMentee={onDeleteMentee}
            onEditMentee={onEditMentee}
            isLoadingGetMentees={isLoadingGetMentees}
            isSuccessGetMentees={isSuccessGetMentees}
            mentees={mentees}
          />
        </div>
      </main>
      <AdminCreateMenteeDialog
        onClose={() => {}}
        onOpenChange={onOpenCreateMenteeDialog}
        open={isOpenCreateMenteeDialog}
      />
      <AdminDeleteMenteeDialog
        onClose={() => setChoosedMentee(null)}
        onOpenChange={onOpenDeleteMenteeDialog}
        open={isOpenDeleteMenteeDialog}
        mentee={choosedMentee}
      />
      <AdminEditMenteeDialog
        onClose={() => setChoosedMentee(null)}
        onOpenChange={onOpenEditMenteeDialog}
        open={isOpenEditMenteeDialog}
        mentee={choosedMentee}
      />
    </div>
  )
}
