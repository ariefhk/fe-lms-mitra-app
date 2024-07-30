import { Separator } from "@/components/ui/separator"
import useIsSublinkActive from "@/hooks/useIsSublinkActive"
import { cn } from "@/lib/class-merge"
import Proptypes from "prop-types"
import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { Link } from "react-router-dom"

export default function DashboardNav({ dashLinks }) {
  const { checkIsLinkActive, pathname } = useIsSublinkActive()
  const [expandedDashLink, setExpandedDashLink] = useState({
    id: "",
  })

  const onExpandDashLink = (dashLink) => {
    setExpandedDashLink((prev) =>
      prev.id === dashLink.id
        ? { id: "" }
        : {
            id: dashLink.id,
          },
    )
  }

  return (
    <div className="hidden  border-r-2 border-black/20 font-poppins  h-full bg-white md:block">
      <div className="flex h-full max-h-screen py-5 flex-col gap-y-[40px]">
        <div className="flex  h-14 justify-center items-center  px-4 lg:h-[120px] ">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-2 font-semibold">
            <img
              src="/images/logo-black.png"
              alt=""
              className="w-[140px] h-[70px] flex-shrink-0"
            />
            <span className="block  bg-gradient-to-r from-cyan-400  to-[#8A3DFF] text-transparent bg-clip-text">
              Mobile Development
            </span>
          </Link>
        </div>
        <div className="flex-1  overflow-y-auto">
          <nav className="grid  gap-y-8 items-start px-2 text-sm font-medium lg:px-4">
            {dashLinks?.map((dashLink, index) => {
              const DashIcon = dashLink.icon
              return (
                <div key={index + 1} className="px-3">
                  <Link
                    onClick={() =>
                      dashLink.subLinks.length > 0
                        ? onExpandDashLink(dashLink)
                        : undefined
                    }
                    to={dashLink.subLinks.length > 0 ? "#" : dashLink.href}
                    className={cn(
                      "flex items-center justify-between group/item rounded-lg  py-2 transition-all hover:text-primary ",
                    )}>
                    <div className="flex items-center gap-3">
                      <DashIcon
                        className={cn(
                          "w-8 h-8 flex-shrink-0  fill-black group-hover/item:fill-cyan-400 group-hover/item:text-cyan-400",
                          {
                            "fill-cyan-400 text-cyan-400 w-8 h-8":
                              checkIsLinkActive(dashLink.href),
                          },
                          {
                            "fill-cyan-400 text-cyan-400  w-8 h-8":
                              dashLink.subLinks.length > 0 &&
                              dashLink.subLinks.find(
                                (sub) => sub.href === pathname,
                              ),
                          },
                        )}
                      />
                      <span
                        className={cn(
                          "block text-txt16_24 group-hover/item:bg-gradient-to-r group-hover/item:from-cyan-400  group-hover/item:to-[#8A3DFF]  group-hover/item:text-transparent group-hover/item:bg-clip-text",
                          {
                            "bg-gradient-to-r from-cyan-400 text-[16px] leading-[24px] to-[#8A3DFF] text-transparent bg-clip-text":
                              checkIsLinkActive(dashLink.href),
                          },
                          {
                            "bg-gradient-to-r from-cyan-400 text-[16px] leading-[24px] to-[#8A3DFF] text-transparent bg-clip-text":
                              dashLink.subLinks.length > 0 &&
                              dashLink.subLinks.find(
                                (sub) => sub.href === pathname,
                              ),
                          },
                        )}>
                        {" "}
                        {dashLink.name}
                      </span>
                    </div>
                    {dashLink.subLinks.length > 0 && (
                      <IoIosArrowDown
                        className={cn(
                          "w-8 h-8 group-hover/item:fill-[#8A3DFF] transition duration-300",
                          {
                            "transform rotate-180 ":
                              dashLink.id === expandedDashLink.id,
                          },

                          {
                            "fill-[#8A3DFF]": checkIsLinkActive(dashLink.href),
                          },
                          {
                            "fill-[#8A3DFF]":
                              dashLink.subLinks.length > 0 &&
                              dashLink.subLinks.find(
                                (sub) => sub.href === pathname,
                              ),
                          },
                        )}
                      />
                    )}
                  </Link>
                  {dashLink.id === expandedDashLink.id &&
                    dashLink.subLinks.length > 0 &&
                    dashLink.subLinks.map((dashSubLink, index) => {
                      return (
                        <Link
                          key={index + 1}
                          to={dashSubLink.href}
                          className={cn(
                            "flex items-center justify-between group/item rounded-lg ml-12  mt-3  py-2 transition-all hover:text-primary ",
                          )}>
                          <div className="flex items-center gap-3">
                            <Separator
                              orientation="vertical"
                              className={cn(
                                "h-[48px] w-[2px] bg-black group-hover/item:bg-gradient-to-r group-hover/item:from-cyan-400  group-hover/item:to-[#8A3DFF]",
                                {
                                  "bg-gradient-to-r from-cyan-400  to-[#8A3DFF]":
                                    checkIsLinkActive(dashSubLink.href),
                                },
                              )}
                            />
                            <span
                              className={cn(
                                "block text-txt16_24 group-hover/item:bg-gradient-to-r group-hover/item:from-cyan-400  group-hover/item:to-[#8A3DFF]  group-hover/item:text-transparent group-hover/item:bg-clip-text",
                                {
                                  "bg-gradient-to-r from-cyan-400  text-[16px] leading-[24px] to-[#8A3DFF] text-transparent bg-clip-text":
                                    checkIsLinkActive(dashSubLink.href),
                                },
                              )}>
                              {dashSubLink.name}
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

DashboardNav.propTypes = {
  dashLinks: Proptypes.array.isRequired,
}
