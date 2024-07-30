export function handleStatusPresence(status) {
  switch (status) {
    case "PRESENT":
      return "Hadir"
    case "ABSENT":
      return "Absen"
    case "HOLIDAY":
      return "Libur"
  }
}
