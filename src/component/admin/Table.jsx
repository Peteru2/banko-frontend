import React from "react";
import UserSearch from "./UserSearch";

const Table = ({ users, handleDelete, setUsers, handleView }) => {
  const hasUsers = users && users.length > 0;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-0 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-neutral-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg font-medium">Users</h3>
          <div className="flex items-center gap-2">
            <UserSearch setUsers={setUsers} />
            <button className="px-3 py-2 rounded-md bg-emerald-500 text-white text-sm">
              New
            </button>
          </div>
        </div>
      </div>

      {hasUsers ? (
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Date Joined</th>
                <th className="px-6 py-4 text-left text-sm font-medium">KYC</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-900"
                >
                  <td className="px-6 py-4">{u.firstname} {u.lastname}</td>
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
                      {u.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(u)}
                        className="text-sm px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700"
                      >
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
      ) : (
       
        <div className="p-10 text-center text-gray-500 text-sm dark:text-neutral-400">
          No results found.
        </div>
      )}
    </div>
  );
};

export default Table;
