import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminCreateSeniorMentorDialog from "@/components/dialog/admin/add-senior-mentor-dialog"
import AdminDeleteSeniorMentorDialog from "@/components/dialog/admin/delete-senior-mentor-dialog"
import AdminDetailSeniorMentorDialog from "@/components/dialog/admin/detail-senior-mentor-dialog"
import AdminEditSeniorMentorDialog from "@/components/dialog/admin/edit-senior-mentor-dialog"
import AdminListSeniorMentorTable from "@/components/table/admin/list-senior-mentor"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindAllSeniorMentorQuery } from "@/store/api/senior-mentor.api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialSeniorMentorSearch = {
  name: "",
}

export default function AdminListSeniorMentorPage() {
  const [choosedSeniorMentor, setChoosedSeniorMentor] = useState(null)

  const {
    isOpenDialog: isOpenCreateSeniorMentorDialog,
    onOpenDialog: onOpenCreateSeniorMentorDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditSeniorMentorDialog,
    onOpenDialog: onOpenEditSeniorMentorDialog,
  } = useDialog()
  const {
    isOpenDialog: isOpenDeleteSeniorMentorDialog,
    onOpenDialog: onOpenDeleteSeniorMentorDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenDetailSeniorMentorDialog,
    onOpenDialog: onOpenDetailSeniorMentorDialog,
  } = useDialog()

  const {
    values: searchSeniorMentorSearch,
    onChange: onChangeSearchSeniorMentorSearch,
  } = useInput(initialSeniorMentorSearch)

  const {
    data: seniorMentors,
    isLoading: isLoadingGetSeniorMentors,
    isSuccess: isSuccessGetSeniorMentors,
  } = useFindAllSeniorMentorQuery({
    name: searchSeniorMentorSearch.name,
  })

  function onDetailSeniorMentor(seniorMentor) {
    setChoosedSeniorMentor(seniorMentor)
    onOpenDetailSeniorMentorDialog(true)
  }
  function onEditSeniorMentor(seniorMentor) {
    setChoosedSeniorMentor(seniorMentor)
    onOpenEditSeniorMentorDialog(true)
  }
  function onDeleteSeniorMentor(seniorMentor) {
    setChoosedSeniorMentor(seniorMentor)
    onOpenDeleteSeniorMentorDialog(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Senior Mentor" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientButton
              onClick={() => onOpenCreateSeniorMentorDialog(true)}
              className="w-[184px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
              name="Tambah Data"
              iconClassName="w-6 h-6"
              Icon={IoMdAdd}
            />
            <GradientInput
              placeholder="Cari Senior Mentor..."
              inputClassName="text-[15px]"
              name="name"
              value={searchSeniorMentorSearch.name}
              onChange={onChangeSearchSeniorMentorSearch}
            />
          </div>
          <AdminListSeniorMentorTable
            seniorMentors={seniorMentors}
            isLoadingGetSeniorMentors={isLoadingGetSeniorMentors}
            isSuccessGetSeniorMentors={isSuccessGetSeniorMentors}
            onDetailSeniorMentor={onDetailSeniorMentor}
            onEditSeniorMentor={onEditSeniorMentor}
            onDeleteSeniorMentor={onDeleteSeniorMentor}
          />
        </div>
      </main>

      <AdminCreateSeniorMentorDialog
        open={isOpenCreateSeniorMentorDialog}
        onOpenChange={onOpenCreateSeniorMentorDialog}
        onClose={() => {}}
      />
      <AdminDetailSeniorMentorDialog
        onClose={() => setChoosedSeniorMentor(null)}
        onOpenChange={onOpenDetailSeniorMentorDialog}
        open={isOpenDetailSeniorMentorDialog}
        seniorMentor={choosedSeniorMentor}
      />
      <AdminEditSeniorMentorDialog
        onClose={() => setChoosedSeniorMentor(null)}
        onOpenChange={onOpenEditSeniorMentorDialog}
        open={isOpenEditSeniorMentorDialog}
        seniorMentor={choosedSeniorMentor}
      />
      <AdminDeleteSeniorMentorDialog
        onClose={() => setChoosedSeniorMentor(null)}
        onOpenChange={onOpenDeleteSeniorMentorDialog}
        open={isOpenDeleteSeniorMentorDialog}
        seniorMentor={choosedSeniorMentor}
      />
    </div>
  )
}
