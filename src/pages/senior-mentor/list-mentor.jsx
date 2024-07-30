import DashboardHeader from "@/components/common/dashboard-header"
import { GradientInput } from "@/components/common/gradient-input"
import DetailMentorDialog from "@/components/dialog/common/detail-mentor-dialog"
import SeniorMentorListMentorTable from "@/components/table/senior-mentor/list-mentor"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindMentorBySeniorMentorQuery } from "@/store/api/mentor.api"
import { useState } from "react"

const initialMentorSearch = {
  name: "",
}

export default function SeniorMentorListMentorPage() {
  const [choosedMentor, setChoosedMentor] = useState(null)
  const { values: searchMentorValues, onChange: onChangeSearchMentor } =
    useInput(initialMentorSearch)

  const {
    isOpenDialog: isOpenDetailMentorDialog,
    onOpenDialog: onOpenDetailMentorDialog,
  } = useDialog()

  function onDetailMentor(mentor) {
    setChoosedMentor(mentor)
    onOpenDetailMentorDialog(true)
  }

  const {
    data: mentors,
    isLoading: isLoadingGetMentors,
    isSuccess: isSuccessGetMentors,
  } = useFindMentorBySeniorMentorQuery({
    name: searchMentorValues.name,
  })

  console.log("mentors", mentors)

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Mentor" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientInput
              onChange={onChangeSearchMentor}
              value={searchMentorValues.name}
              name="name"
              placeholder="Cari Mentor..."
              inputClassName="text-[15px]"
            />
          </div>
          <SeniorMentorListMentorTable
            onDetailMentor={onDetailMentor}
            isLoadingGetMentors={isLoadingGetMentors}
            isSuccessGetMentors={isSuccessGetMentors}
            mentors={mentors}
          />
        </div>
      </main>
      <DetailMentorDialog
        onClose={() => setChoosedMentor(null)}
        onOpenChange={onOpenDetailMentorDialog}
        open={isOpenDetailMentorDialog}
        mentor={choosedMentor}
      />
    </div>
  )
}
