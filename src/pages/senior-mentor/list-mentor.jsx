import DashboardHeader from "@/components/common/dashboard-header"
import { GradientInput } from "@/components/common/gradient-input"
import SeniorMentorListMentorTable from "@/components/table/senior-mentor/list-mentor"
import useInput from "@/hooks/useInput"
import { useFindMentorBySeniorMentorQuery } from "@/store/api/mentor.api"
import { getUser } from "@/store/slices/user.slice"
import { useSelector } from "react-redux"

const initialMentorSearch = {
  name: "",
}

export default function SeniorMentorListMentorPage() {
  const { values: searchMentorValues, onChange: onChangeSearchMentor } =
    useInput(initialMentorSearch)
  const user = useSelector(getUser)
  const {
    data: mentors,
    isLoading: isLoadingGetMentors,
    isSuccess: isSuccessGetMentors,
  } = useFindMentorBySeniorMentorQuery({
    seniorMentorId: user?.id,
    name: searchMentorValues.name,
  })

  console.log("mentors", mentors)

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Mentor" />
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
            onDetailMentor={() => {}}
            isLoadingGetMentors={isLoadingGetMentors}
            isSuccessGetMentors={isSuccessGetMentors}
            mentors={mentors}
          />
        </div>
      </main>
    </div>
  )
}
