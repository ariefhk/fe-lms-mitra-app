import Proptypes from "prop-types"
import { Separator } from "../ui/separator"

export default function DashboardProfile({
  imageUrl,
  name,
  email,
  noTelp,
  seniorMentor,
  university,
  batch,
  major,
}) {
  return (
    <div className="w-full rounded-[10px] shadow-2xl max-h-[400px] h-[400px] flex justify-center items-center">
      <div className="flex items-center justify-center gap-x-14   w-3/4">
        <img
          src={imageUrl}
          alt=""
          className="w-[300px] h-[300px] rounded-full object-cover"
        />
        <div className="text-wrap space-y-5">
          <h1 className="text-txt30_40 text-color-4 font-medium">{name}</h1>
          <Separator />
          <h1 className="text-txt16_24 text-color-4 font-medium">
            {" "}
            Email: {email}
          </h1>
          <h1 className="text-txt16_24 text-color-4 font-medium">
            No Telp: {noTelp}
          </h1>
          {seniorMentor && (
            <h1 className="text-txt16_24 text-color-4 font-medium">
              Senior Mentor: {seniorMentor}
            </h1>
          )}
          {university && (
            <h1 className="text-txt16_24 text-color-4 font-medium">
              Universitas: {university}
            </h1>
          )}
          {major && (
            <h1 className="text-txt16_24 text-color-4 font-medium">
              Jurusan/Program Studi: {major}
            </h1>
          )}
          {batch && (
            <h1 className="text-txt16_24 text-color-4 font-medium">
              Batch: {batch}
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

DashboardProfile.propTypes = {
  imageUrl: Proptypes.string,
  name: Proptypes.string,
  email: Proptypes.string,
  noTelp: Proptypes.string,
  seniorMentor: Proptypes.string,
  university: Proptypes.string,
  batch: Proptypes.string,
  major: Proptypes.string,
}
