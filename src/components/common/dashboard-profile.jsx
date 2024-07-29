import Proptypes from "prop-types"
import { Separator } from "../ui/separator"

export default function DashboardProfile({
  imageUrl,
  name,
  email,
  no_telp,
  senior_mentor,
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
          {senior_mentor && (
            <h1 className="text-txt16_24 text-color-4 font-medium">
              Senior Mentor: {senior_mentor}
            </h1>
          )}
          <h1 className="text-txt16_24 text-color-4 font-medium">
            {" "}
            Email: {email}
          </h1>
          <h1 className="text-txt16_24 text-color-4 font-medium">
            No Telp: {no_telp}
          </h1>
        </div>
      </div>
    </div>
  )
}

DashboardProfile.propTypes = {
  imageUrl: Proptypes.string,
  name: Proptypes.string,
  email: Proptypes.string,
  no_telp: Proptypes.string,
  senior_mentor: Proptypes.string,
}
