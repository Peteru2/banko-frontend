import React from "react";
import { Link, useLocation } from "react-router-dom";


import { Home, Wallet, CreditCard, History, MoreHorizontal } from "lucide-react";

const Footer = ({ userData }) => {
  const location = useLocation();

  const navSideList = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Deposits", url: "/deposits", icon: Wallet },
    { title: "Loans", url: "/loans", icon: CreditCard },
    { title: "History", url: "/history", icon: History },
    { title: "More", url: "/more", icon: MoreHorizontal },
  ];

  return (
    <>
      <div className="justify-center items-center flex mt-[100px]">
        <aside className="bg-white dark:bg-darkGray fixed bottom-0 w-full max-w-[600px] rounded-t-[12px] shadow-lg backdrop-blur-md">
          <div className="text-black w-full items-center md:px-12 px-[20px] justify-between flex py-2">
            {navSideList.map((item, index) => {
              const isActive = location.pathname === item.url;
              const Icon = item.icon;

              return (
                <Link
                  to={item.url}
                  key={index}
                  className="flex flex-col items-center justify-center w-full cursor-pointer"
                >
                  <Icon
                    size={24}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-primary dark:text-white scale-110"
                        : "text-black/60 dark:text-white/50"
                    }`}
                  />
                  <p
                    className={`text-[11px] mt-[3px] transition-all duration-300 ${
                      isActive
                        ? "text-primary dark:text-white font-semibold"
                        : "text-black/70 dark:text-white/60"
                    }`}
                  >
                    {item.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Footer;
