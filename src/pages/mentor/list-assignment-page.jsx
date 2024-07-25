import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import MentorCreateAssignmentDialog from "@/components/dialog/mentor/add-assignment-dialog"
import MentorDeleteAssignmentDialog from "@/components/dialog/mentor/delete-assignment-dialog"
import MentorEditAssignmentDialog from "@/components/dialog/mentor/edit-assignment-dialog"
import MentorListAssignmentMenteeTable from "@/components/table/mentor/list-mentee-assignment"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindAllAssignmentQuery } from "@/store/api/assignment.api"
import { getUser } from "@/store/slices/user.slice"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { useSelector } from "react-redux"

const initialAssignmentSearch = {
  title: "",
}

export default function MentorListAssignment() {
  const user = useSelector(getUser)
  const [choosedAssignment, setChoosedAssignment] = useState(null)

  const { values: searchAssignmentValue, onChange: onChangeSearchAssignment } =
    useInput(initialAssignmentSearch)
  const {
    isOpenDialog: isOpenCreateAssignmentDialog,
    onOpenDialog: onOpenCreateAssignmentDialog,
  } = useDialog()
  const {
    isOpenDialog: isOpenDeleteAssignmentDialog,
    onOpenDialog: onOpenDeleteAssignmentDialog,
  } = useDialog()
  const {
    isOpenDialog: isOpenEditAssignmentDialog,
    onOpenDialog: onOpenEditAssignmentDialog,
  } = useDialog()

  const {
    data: assignments,
    isLoading: isLoadingGetAssignments,
    isSuccess: isSuccessGetAssignments,
  } = useFindAllAssignmentQuery({
    classId: user?.class?.id,
    title: searchAssignmentValue?.title,
  })

  function onDeleteAssigment(assignment) {
    setChoosedAssignment(assignment)
    onOpenDeleteAssignmentDialog(true)
  }
  function onEditAssigment(assignment) {
    setChoosedAssignment(assignment)
    onOpenEditAssignmentDialog(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Tugas" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientButton
              onClick={() => onOpenCreateAssignmentDialog(true)}
              className="w-[184px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
              name="Tambah Data"
              iconClassName="w-6 h-6"
              Icon={IoMdAdd}
            />
            <GradientInput
              onChange={onChangeSearchAssignment}
              value={searchAssignmentValue.title}
              name="title"
              placeholder="Cari Tugas..."
              inputClassName="text-[15px]"
            />
          </div>
          <MentorListAssignmentMenteeTable
            onDeleteAssigment={onDeleteAssigment}
            onEditAssigment={onEditAssigment}
            isLoadingGetAssignments={isLoadingGetAssignments}
            isSuccessGetAssignments={isSuccessGetAssignments}
            assignments={assignments}
          />
        </div>
      </main>
      <MentorCreateAssignmentDialog
        onClose={() => {}}
        isOpen={isOpenCreateAssignmentDialog}
        onOpenChange={onOpenCreateAssignmentDialog}
        classId={user?.class?.id}
        open={isOpenCreateAssignmentDialog}
      />

      <MentorEditAssignmentDialog
        onClose={() => setChoosedAssignment(null)}
        onOpenChange={onOpenEditAssignmentDialog}
        open={isOpenEditAssignmentDialog}
        assignment={choosedAssignment}
        classId={user?.class?.id}
      />

      <MentorDeleteAssignmentDialog
        onClose={() => setChoosedAssignment(null)}
        onOpenChange={onOpenDeleteAssignmentDialog}
        open={isOpenDeleteAssignmentDialog}
        assignment={choosedAssignment}
      />
    </div>
  )
}
