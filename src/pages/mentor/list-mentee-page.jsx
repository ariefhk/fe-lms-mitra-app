import DashboardHeader from "@/components/common/dashboard-header"
import { GradientInput } from "@/components/common/gradient-input"
import DetailMenteeDialog from "@/components/dialog/common/detail-mentee-dialog"
import MentorListMenteeTable from "@/components/table/mentor/list-mentee"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindAllMenteeByClassQuery } from "@/store/api/mentee.api"
import { getUser } from "@/store/slices/user.slice"
import { useState } from "react"
import { useSelector } from "react-redux"

const initialMenteeSearch = {
  name: "",
}

export default function MentorListMenteePage() {
  const [choosedMentee, setChoosedMentee] = useState(null)
  const user = useSelector(getUser)
  const { values: searchMenteeValue, onChange: onChangeSearchMentee } =
    useInput(initialMenteeSearch)

  const {
    isOpenDialog: isOpenDetailMenteeDialog,
    onOpenDialog: onOpenDetailMenteeDialog,
  } = useDialog()

  const {
    data: mentees,
    isLoading: isLoadingGetMentees,
    isSuccess: isSuccessGetMentees,
  } = useFindAllMenteeByClassQuery({
    classId: user?.class?.id,
    name: searchMenteeValue.name,
  })

  function onDetailMentee(mentee) {
    setChoosedMentee(mentee)
    onOpenDetailMenteeDialog(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Mentee" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientInput
              onChange={onChangeSearchMentee}
              value={searchMenteeValue.name}
              name="name"
              placeholder="Cari Mentee..."
              inputClassName="text-[15px]"
            />
          </div>
          <MentorListMenteeTable
            onDetailMentee={onDetailMentee}
            isLoadingGetMentees={isLoadingGetMentees}
            isSuccessGetMentees={isSuccessGetMentees}
            mentees={mentees}
          />
        </div>
      </main>
      <DetailMenteeDialog
        onClose={() => setChoosedMentee(null)}
        onOpenChange={onOpenDetailMenteeDialog}
        open={isOpenDetailMenteeDialog}
        mentee={choosedMentee}
      />
    </div>
  )
}
