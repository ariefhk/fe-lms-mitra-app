import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminCreateClassDialog from "@/components/dialog/admin/add-class-dialog"
import AdminDeleteClassDialog from "@/components/dialog/admin/delete-class-dialog"
import AdminEditClassDialog from "@/components/dialog/admin/edit-class-dialog"
import AdminListClassTable from "@/components/table/admin/list-class"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindAllClassQuery } from "@/store/api/class.api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialClassSearch = {
  name: "",
}

export default function AdminListClassPage() {
  const [choosedClass, setChoosedClass] = useState(null)
  const {
    isOpenDialog: isOpenCreateClassDialog,
    onOpenDialog: onOpenCreateClassDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenDeleteClassDialog,
    onOpenDialog: onOpenDeleteClassDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditClassDialog,
    onOpenDialog: onOpenEditClassDialog,
  } = useDialog()

  const { values: searchClassSearch, onChange: onChangeClassSearch } =
    useInput(initialClassSearch)

  const {
    data: classes,
    isLoading: isLoadingGetClasses,
    isSuccess: isSuccessGetClasses,
  } = useFindAllClassQuery({
    name: searchClassSearch?.name,
  })

  function onDeleteClass(classes) {
    setChoosedClass(classes)
    onOpenDeleteClassDialog(true)
  }

  function onEditClass(classes) {
    setChoosedClass(classes)
    onOpenEditClassDialog(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Kelas" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientButton
              onClick={() => onOpenCreateClassDialog(true)}
              name="Tambah Data"
              className="w-[184px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
              iconClassName="w-6 h-6"
              Icon={IoMdAdd}
            />
            <GradientInput
              onChange={onChangeClassSearch}
              value={searchClassSearch.name}
              name="name"
              inputClassName="text-[15px]"
              placeholder="Cari Kelas..."
            />
          </div>
          <AdminListClassTable
            onDeleteClass={onDeleteClass}
            onEditClass={onEditClass}
            isLoadingGetClasses={isLoadingGetClasses}
            isSuccessGetClasses={isSuccessGetClasses}
            classes={classes}
          />
        </div>
      </main>
      <AdminCreateClassDialog
        onClose={() => {}}
        onOpenChange={onOpenCreateClassDialog}
        open={isOpenCreateClassDialog}
      />
      <AdminDeleteClassDialog
        onClose={() => setChoosedClass(null)}
        onOpenChange={onOpenDeleteClassDialog}
        open={isOpenDeleteClassDialog}
        classes={choosedClass}
      />
      <AdminEditClassDialog
        onClose={() => setChoosedClass(null)}
        onOpenChange={onOpenEditClassDialog}
        open={isOpenEditClassDialog}
        classes={choosedClass}
      />
    </div>
  )
}
