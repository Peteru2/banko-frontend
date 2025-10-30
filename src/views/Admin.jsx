import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Shield,
  Settings,
  Menu,
  X
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

export default function Admin() {
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

  // Mock data loaders
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const usersJson = [
          {
            _id: "u1",
            name: "Marcei Dogar",
            email: "marcei@example.com",
            phone: "76357068",
            createdAt: "2021-05-01",
            kyc: "Verified",
            status: "Active"
          },
          {
            _id: "u2",
            name: "Fareni Theen",
            email: "fareni@example.com",
            phone: "81134356",
            createdAt: "2021-04-01",
            kyc: "Pending",
            status: "Suspended"
          },
          {
            _id: "u3",
            name: "Nestthi Uriward",
            email: "nestthi@noan.com",
            phone: "88671081",
            createdAt: "2021-12-01",
            kyc: "Verified",
            status: "Active"
          },
          {
            _id: "u4",
            name: "Barba Sawaha",
            email: "barba@example.com",
            phone: "89334344",
            createdAt: "2021-06-01",
            kyc: "Verified",
            status: "Active"
          }
        ];

        setUsers(usersJson);
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
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (!ok) return;

    try {
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setStats((s) => ({ ...s, totalUsers: s.totalUsers - 1 }));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <div className="text-center p-6 rounded-lg shadow bg-white dark:bg-neutral-800">
          <div className="animate-pulse h-4 w-48 bg-gray-200 dark:bg-neutral-700 mb-4 rounded"></div>
          <div className="text-sm text-gray-500 dark:text-neutral-300">
            Loading admin data...
          </div>
        </div>
      </div>
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
    <div className="min-h-screen bg-bg dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Sidebar */}
          <aside
            className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-white dark:bg-neutral-800 shadow-lg lg:shadow-sm p-6 flex flex-col gap-6 z-40 transform transition-transform duration-300 ${
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
                <li className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-neutral-700 text-emerald-700 dark:text-emerald-300 font-medium">
                  <LayoutDashboard size={18} />
                  Dashboard
                </li>
                <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <Users size={18} />
                  Users
                </li>
                <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <CreditCard size={18} />
                  Transactions
                </li>
                <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <Shield size={18} />
                  KYC
                </li>
                <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <Settings size={18} />
                  Settings
                </li>
              </ul>
            </nav>

            <div className="text-sm text-gray-500 dark:text-neutral-400">
              Admin • bankoo@example.com
            </div>
          </aside>

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
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-700"></div>
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
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-0 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-neutral-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-lg font-medium">Users</h3>
                  <div className="flex items-center gap-2">
                    <input
                      className="px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-sm"
                      placeholder="Search users"
                    />
                    <button className="px-3 py-2 rounded-md bg-emerald-500 text-white text-sm">
                      New
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[800px] w-full">
                  <thead className="bg-gray-50 dark:bg-neutral-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Date Joined
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        KYC
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="border-t border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-900"
                      >
                        <td className="px-6 py-4">{u.name}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">{u.phone}</td>
                        <td className="px-6 py-4">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              u.kyc === "Verified"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {u.kyc}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              u.status === "Active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-sm px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700">
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(u._id)}
                              className="text-sm px-3 py-2 rounded-md bg-rose-500 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
