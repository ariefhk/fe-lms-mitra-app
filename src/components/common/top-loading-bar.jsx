import LoadingBar from "react-redux-loading-bar"

export default function TopLoadingBar() {
  return (
    <div className="sticky top-0 w-full z-30">
      <LoadingBar
        style={{
          backgroundColor: "transparent", // Set this to transparent to avoid conflicts
          backgroundImage: "linear-gradient(to right, #32C7C4, #532599)", // Define your gradient here
          height: "2px",
          width: "100%",
        }}
      />
    </div>
  )
}
