export const getFile = (fileLocation) => {
  return `${import.meta.env?.VITE_BASE_API_URL}/file-download?fileLocation=${fileLocation}`
}
