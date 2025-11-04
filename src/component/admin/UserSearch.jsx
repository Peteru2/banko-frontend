import { useState, useEffect } from "react";
import api from "../../services/api";

const UserSearch = ({ setUsers }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(query);
    }, 400); // wait 400ms after user stops typing

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchUsers = async (searchTerm = "") => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/users?search=${searchTerm}`);
      if (res.data.success) {setUsers(res.data.users)}
      else{
        return (
          <div className = "text-center">
            No result found
          </div>
        )
      };
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder="Search by name or email..."
      />
      </div>
      <div>
      {loading && <span className="text-xs text-gray-500"><i className="fas fa-spinner fa-spin"></i></span>}
      </div>
    </div>
  );
};

export default UserSearch;
