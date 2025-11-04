
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Shield,
  Settings,
  X
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
const Sidebar = ({sidebarOpen, setSidebarOpen}) =>{
    const { userData } = useAuth()
        return(
                      <aside
            className={`fixed lg: top-0 bottom-0 left-0 h-sreen lg:h-auto w-64 bg-white dark:bg-neutral-800 shadow-lg lg:shadow-sm p-6 flex flex-col gap-6 z-40 transform transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-private flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div className="text-lg font-semibold">Bankoo</div>
              </div>

           
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 dark:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="flex flex-col gap-1">
                <li className="flex items-center gap-3 px-3 cursor-pointer py-2 rounded-lg bg-emerald-50 dark:bg-neutral-700 text-emerald-700 dark:text-emerald-300 font-medium">
                  <LayoutDashboard size={18} />
                  Dashboard
                </li>
                <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <Users size={18} />
                  Users
                </li>
                <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <CreditCard size={18} />
                  Transactions
                </li>
                <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <Shield size={18} />
                  KYC
                </li>
                <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <Settings size={18} />
                  Settings
                </li>
              </ul>
            </nav>

            <div className="text-sm text-gray-500 dark:text-neutral-400">
              Admin • {userData?.email}
            </div>
          </aside>
        )
}
export default Sidebar;