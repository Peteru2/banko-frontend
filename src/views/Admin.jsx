import React, { useEffect, useState } from "react";
import Sidebar from "../component/admin/sidebar";
import Loader from "../component/admin/Loader";
import { useAuth } from "../auth/AuthContext";
import api from "../services/api";
import Swal from "sweetalert2";
import {
  Menu,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Table from "../component/admin/Table";

export default function Admin() {
  const {userData}= useAuth()
  const token = "REPLACE_WITH_TOKEN_FROM_AUTH_CONTEXT";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newToday: 0,
    totalBalances: 0,
    transactionsWeek: 0
  });
  const [chartData, setChartData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const fetchUsers = async () => {
    try {
      setLoading(true);
     const res = await api.get("/admin/users")
      if (res.data?.success) setUsers(res.data.users );
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        fetchUsers()
        const statsJson = {
          totalUsers: 3256,
          newToday: 48,
          totalBalances: 1625000,
          transactionsWeek: 6480000
        };
        setStats(statsJson);

        const months = [
          { month: "Jan", signups: 10 },
          { month: "Feb", signups: 320 },
          { month: "Mar", signups: 520 },
          { month: "Apr", signups: 650 },
          { month: "May", signups: 800 },
          { month: "Jun", signups: 980 },
          { month: "Jul", signups: 1430 }
        ];
        setChartData(months);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  // Delete user handler
  const handleDelete = async (userId, email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You’re about to delete ${email}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f1f1f",
      color: "#f5f5f5",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await api.delete(`/admin/users/${userId}`);
      const data  = res.data
      if (res.ok) {
        Swal.fire({
          title: "Deleted!",
          text: data.message || "User has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: "#1f1f1f",
          color: "#f5f5f5",
        });
        fetchUsers(); 
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Something went wrong while deleting.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          background: "#1f1f1f",
          color: "#f5f5f5",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        title: "Network Error",
        text: "Could not connect to the server. Please try again later.",
        icon: "error",
        background: "#1f1f1f",
        color: "#f5f5f5",
      });
    }
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-neutral-900 lg:ml-64 text-gray-900 dark:text-gray-100">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 lg:hidden z-30"
            ></div>
          )}

          
          <main className="flex-1 w-full">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md bg-gray-100 dark:bg-neutral-800"
                >
                  <Menu size={18} />
                </button>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-md border border-gray-200 dark:border-neutral-700 text-sm">
                  Export
                </button>
                 {userData?.profileImage? (<img
                              src={userData?.profileImage}
                              alt="profileImage"
                              className=" text-black  h-10 w-10  rounded-full"
                            />):(
                
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-700"></div>
                
                            )}
               
              </div>
            </div>

       
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                label="Total Users"
                value={stats.totalUsers.toLocaleString()}
              />
              <StatCard label="New Users Today" value={stats.newToday} />
              <StatCard
                label="Total Balances"
                value={`₦${Number(stats.totalBalances).toLocaleString()}`}
              />
              <StatCard
                label="Transactions This Week"
                value={`₦${Number(stats.transactionsWeek).toLocaleString()}`}
              />
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">User Signups</h2>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="signups"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Users Table */}
            <Table users={users} handleDelete={handleDelete}/>
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper Component
function StatCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-sm">
      <div className="text-xs text-gray-500 dark:text-neutral-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}
