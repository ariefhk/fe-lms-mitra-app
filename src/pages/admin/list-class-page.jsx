import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientInput } from "@/components/common/gradient-input"
import AdminCreateClassDialog from "@/components/dialog/admin/add-class-dialog"
import AdminListClassTable from "@/components/table/admin/list-class"
import useDialog from "@/hooks/useDialog"
import useInput from "@/hooks/useInput"
import { useFindAllClassQuery } from "@/store/api/class.api"
import { IoMdAdd } from "react-icons/io"

const initialClassSearch = {
  name: "",
}

export default function AdminListClassPage() {
  const {
    isOpenDialog: isOpenCreateClassDialog,
    onOpenDialog: onOpenCreateClassDialog,
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

  console.log("classes", classes)

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Daftar Kelas" />
      <main className="flex flex-1 flex-col  gap-4  p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-end gap-y-8">
          <div className="flex items-center ">
            <GradientButton
              onClick={() => onOpenCreateClassDialog(true)}
              className="w-[184px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
              name="Tambah Data"
              iconClassName="w-6 h-6"
              Icon={IoMdAdd}
            />
            <GradientInput
              placeholder="Cari Kelas..."
              inputClassName="text-[15px]"
              name="name"
              value={searchClassSearch.name}
              onChange={onChangeClassSearch}
            />
          </div>
          <AdminListClassTable
            onDeleteClass={() => {}}
            onEditClass={() => {}}
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
    </div>
  )
}
