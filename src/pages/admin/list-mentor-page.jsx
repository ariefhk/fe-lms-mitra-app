import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminListMentorTable from "@/components/table/admin/list-mentor"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindAllMentorQuery } from "@/store/api/mentor.api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialMentorSearch = {
  name: "",
}

export default function AdminListMentorPage() {
  const [choosedMentor, seChoosedMentor] = useState(null)

  const {
    isOpenDialog: isOpenCreateMentorDialog,
    onOpenDialog: onOpenCreateMentorDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditMentorDialog,
    onOpenDialog: onOpenEditMentorDialog,
  } = useDialog()
  const {
    isOpenDialog: isOpenDeleteMentorDialog,
    onOpenDialog: onOpenDeleteMentorDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenDetailMentorDialog,
    onOpenDialog: onOpenDetailMentorDialog,
  } = useDialog()

  const { values: searchMentorSearch, onChange: onChangeMentorSearch } =
    useInput(initialMentorSearch)

  const {
    data: mentors,
    isLoading: isLoadingGetMentor,
    isSuccess: isSuccessGetMentor,
  } = useFindAllMentorQuery({
    name: searchMentorSearch.name,
  })

  function onDetailMentor(mentor) {
    seChoosedMentor(mentor)
    onOpenDetailMentorDialog(true)
  }
  function onEditMentor(mentor) {
    seChoosedMentor(mentor)
    onOpenEditMentorDialog(true)
  }
  function onDeleteMentor(mentor) {
    seChoosedMentor(mentor)
    onOpenDeleteMentorDialog(true)
  }

  console.log(mentors)

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Mentor" />
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
              placeholder="Cari Mentor..."
              inputClassName="text-[15px]"
              name="name"
              value={searchMentorSearch.name}
              onChange={onChangeMentorSearch}
            />
          </div>
          <AdminListMentorTable
            isLoadingGetMentors={isLoadingGetMentor}
            isSuccessGetMentors={isSuccessGetMentor}
            mentors={mentors}
            onDeleteMentor={() => {}}
            onEditMentor={() => {}}
          />
        </div>
      </main>
    </div>
  )
}
