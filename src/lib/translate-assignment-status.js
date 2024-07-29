export function translateAssignmentStatus(status) {
  switch (status) {
    case "UNCOMPLETED":
      return "Belum Dikumpulkan"
    case "PENDING":
      return "Menunggu Review"
    case "REVISION":
      return "Perlu Revisi"
    case "COMPLETED":
      return "Sudah Dinilai"
  }
}
