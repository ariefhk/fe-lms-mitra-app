import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export default function Unauthorized({ isLogged }) {
  const navigate = useNavigate()

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">401</h1>
        <span className="font-medium">Ups! Kamu Tidak Memiliki Akses!</span>
        <p className="text-center text-muted-foreground">
          Halaman yang akan kamu akses diblokir <br />
          Sepertinya kamu tidak diberi akses!.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Kembali
          </Button>
          {isLogged ? (
            <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Kembali ke Login</Button>
          )}
        </div>
      </div>
    </div>
  )
}

Unauthorized.propTypes = {
  isLogged: PropTypes.bool,
}
