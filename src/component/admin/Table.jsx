import React from 'react'

const Table = ({users, handleDelete}) => {
  return (

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
                        <td className="px-6 py-4">{u.firstname} {" "} {u.lastname}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">{u.phoneNumber}</td>
                        <td className="px-6 py-4">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              u.kycLevel === "1"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {u.kycLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              u.status === true
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
                              onClick={() => handleDelete(u._id, u.email)}
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
  )
}

export default Table