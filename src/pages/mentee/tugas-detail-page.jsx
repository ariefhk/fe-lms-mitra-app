import DashboardHeader from "@/components/common/dashboard-header"
import { GradientButton } from "@/components/common/gradient-button"
import { GradientLink } from "@/components/common/gradient-link"
import { cn } from "@/lib/class-merge"
import { formattedDate } from "@/lib/date"
import { getFile } from "@/lib/getFile"
import {
  useCreateMenteeSubmitAssignmentMutation,
  useFindMenteeAssignmentDetailQuery,
} from "@/store/api/assignment.api"
import { getUser } from "@/store/slices/user.slice"
import { useRef, useState } from "react"
import { FaCloudDownloadAlt } from "react-icons/fa"
import { GrDocumentPdf } from "react-icons/gr"
import { IoMdAdd } from "react-icons/io"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"

export function AssignmentDetailStatus({ status }) {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="text-green-600 text-txt18_20  font-medium group-hover:text-white">
          Sudah dinilai !
        </span>
      )
    case "PENDING":
      return (
        <span className="text-yellow-600 text-txt18_20 font-medium group-hover:text-white">
          Sedang di review Mentor, mohon tunggu !
        </span>
      )
    case "REVISION":
      return (
        <span className="text-rose-600 text-txt18_20 font-medium group-hover:text-white">
          Terdapat Revisi, segera perbaiki !
        </span>
      )
    case "UNCOMPLETED":
      return (
        <span className="text-rose-600 text-txt18_20 font-medium group-hover:text-white">
          Belum Dikumpukan, segera kumpulkan !
        </span>
      )
  }
}

export default function MenteeTugasDetailPage() {
  const { assignmentId } = useParams()
  const user = useSelector(getUser)
  const inputRef = useRef(null)
  const [files, setFiles] = useState(null)

  const [
    submiMenteeAssignment,
    { isLoading: isLoadingSubmitMenteeAssignment },
  ] = useCreateMenteeSubmitAssignmentMutation()

  const {
    data: menteeAssignmentDetail,
    isSuccess: isSuccessGetMenteeAssignmentDetail,
  } = useFindMenteeAssignmentDetailQuery(
    {
      assignmentId: assignmentId,
      menteeId: user?.id,
    },
    {
      skip: !assignmentId || !user?.id,
    },
  )

  // console.log("MENTEE ASSIGNMENT DETAIL: ", menteeAssignmentDetail)

  function handleDownloadFile(file) {
    const url = URL.createObjectURL(file)
    window.open(url, "_blank")
    URL.revokeObjectURL(url)
  }

  async function onSubmit() {
    const submitMenteeAssignment = {
      assignmentId: assignmentId,
      menteeId: user?.id,
      assignmentFile: files[0],
    }

    try {
      await submiMenteeAssignment(submitMenteeAssignment).unwrap()
      setFiles(null)
      Swal.fire({
        icon: "success",
        title: "Berhasil Submit jawaban!",
        text: "Selamat Anda berhasil submit jawaban!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR UPDATE PROFILE: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Submit jawaban!",
        text: "Maaf, Anda gagal submit jawaban!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <div className="h-full">
      <DashboardHeader title="Mengumpulkan Tugas" />
      <main className="flex flex-1 flex-col  p-4 lg:gap-10 lg:p-6">
        <div className="space-y-5">
          <h1 className="font-semibold text-txt18_20">Detail Tugas Anda</h1>
          {isSuccessGetMenteeAssignmentDetail && (
            <div className="space-y-1 ">
              <h1>Nama : {menteeAssignmentDetail?.assignment?.title}</h1>
              <h1>
                Tenggat Waktu :{" "}
                <span className="text-rose-600 font-medium">
                  {formattedDate(
                    menteeAssignmentDetail?.assignment?.dueDate,
                    true,
                  )}
                </span>
              </h1>
              <h1>
                Status :{" "}
                {
                  <AssignmentDetailStatus
                    status={menteeAssignmentDetail?.status}
                  />
                }
              </h1>
              <h1>
                Nilai :{" "}
                <span className="text-txt18_20 font-semibold">
                  {menteeAssignmentDetail?.grade}
                </span>
              </h1>
            </div>
          )}
          <div className="flex items-center gap-x-5">
            <GradientLink
              to={getFile(menteeAssignmentDetail?.assignment?.file)}
              className="w-[240px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
              name="Download File Tugas"
              iconClassName="w-6 h-6"
              Icon={FaCloudDownloadAlt}
            />
          </div>
        </div>
        <div className="space-y-5">
          <div className="border max-w-[800px] p-6 rounded-lg">
            <div className="space-y-5">
              <div className="space-y-5">
                <div className="space-x-3 flex">
                  <button
                    type="button"
                    className="border px-4 py-1.5 hover:bg-slate-500 hover:text-white rounded-lg"
                    onClick={() => {
                      inputRef.current?.click()
                    }}>
                    Pilih File Tugas
                  </button>
                  {files && (
                    <div className="flex items-center gap-x-2">
                      <button
                        type="button"
                        className="border px-4 py-1.5 bg-rose-600 text-white hover:bg-slate-500 hover:text-white rounded-lg"
                        onClick={() => {
                          setFiles(null)
                        }}>
                        Hapus File
                      </button>
                      <button
                        type="button"
                        className="border px-4 py-1.5 bg-color-1 text-white rounded-lg"
                        onClick={() => {
                          handleDownloadFile(files[0])
                        }}>
                        Lihat File
                      </button>
                    </div>
                  )}
                </div>
                <GrDocumentPdf
                  className={cn("flex-shrink-0 w-[100px] h-[100px]", {
                    "text-destructive": !files,
                    "text-green-500": files,
                  })}
                />
              </div>
              <input
                ref={inputRef}
                hidden
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setFiles(e.target.files)
                }}
              />
              {files ? (
                <div>
                  Kamu memilih file{" "}
                  <span className="pl-1 font-medium">{files[0]?.name}</span>
                </div>
              ) : (
                <div className="font-medium text-sm">
                  Anda belum memilih File!
                </div>
              )}
            </div>
          </div>
          <GradientButton
            onClick={async () => {
              await onSubmit()
            }}
            isLoading={isLoadingSubmitMenteeAssignment}
            isDisabled={!files}
            className="w-[180px] rounded-full text-[15px] flex gap-x-2 h-[45px] p-0"
            name="Upload Tugas"
            iconClassName="w-6 h-6"
            Icon={IoMdAdd}
          />
        </div>
      </main>
    </div>
  )
}
