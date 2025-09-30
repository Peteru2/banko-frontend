import React from "react";
import DashboardActive from "../../assets/image/dashboard-active.svg";
import DashboardInActive from "../../assets/image/dashboard-inactive.svg";
import DepositActive from "../../assets/image/deposits-active.svg";
import DepositInActive from "../../assets/image/deposits-inactive.svg";
import LoanActive from "../../assets/image/loans-active.svg";
import LoanInActive from "../../assets/image/loans-inactive.svg";
import NotificationActive from "../../assets/image/notification-active.svg";
import NotificationInActive from "../../assets/image/notification-inactive.svg";
import MoreActive from "../../assets/image/more-active.svg";
import MoreInActive from "../../assets/image/more-inactive.svg";

import { Link, useLocation } from "react-router-dom";
const Footer = ({ userData }) => {
  const navSideList = [
    {
      title: "Dashboard",
      url: "/",
      active: DashboardActive,
      inactive: DashboardInActive,
    },
    {
      title: "Deposits",
      url: "/dfd",
      active: DepositActive,
      inactive: DepositInActive,
    },
    {
      title: "Loans",
      url: "/dfd",
      active: LoanActive,
      inactive: LoanInActive,
    },
    {
      title: "History",
      url: "/history",
      active: NotificationActive,
      inactive: NotificationInActive,
      userData: userData,
    },
    {
      title: "More",
      url: "/dfdg",
      active: MoreActive,
      inactive: MoreInActive,
    },
  ];
  const location = useLocation();

  return (
    <>
      <div className="justify-center items-center flex mt-[100px]">
        <aside className="bg-white fixed  w-full max-w-[600px]  bottom-0 rounded-tr-[10px] rounded-tl-[10px]">
          <div className=" text-black w-full items-center md:px-12 px-[20px] justify-between flex  text-opacity-50 ">
            {navSideList.map((item, index) => {
              const isActive = location.pathname === item.url;
              return (
                <div
                  key={index}
                  className={` text-sm py-4 flex justify-between ${location.pathname === item.url ? " text-text" : ""} `}
                >
                  <Link
                    to={item.url}
                    className="text-center items-center justify-center outline-none flex"
                  >
                    <div className="flex flex-col items-center">
                      <div className=" ">
                        <img
                          src={
                            isActive
                              ? item.active
                              : item.inactive
                          }
                          alt="Image"
                          className="  text-private w-[23px] h-[23px] "
                        />
                      </div>
                      <p
                        className={`
                      text-[11px] text-black text-opacity-80 font-400 ${location.pathname === item.url ? " text-tet " : ""}
                    `}
                      >
                        {item.title}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Footer;
