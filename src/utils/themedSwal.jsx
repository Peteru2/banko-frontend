import Swal from "sweetalert2";

const themedSwal = (options = {}, theme = "light") => {
  const isDark = theme === "dark";

  return Swal.fire({
    background: isDark ? "#1f1f1f" : "#ffffff",
    color: isDark ? "#f5f5f5" : "#111111",
    confirmButtonColor: isDark ? "#3b82f6" : "#2563eb",
    cancelButtonColor: isDark ? "#6b7280" : "#d1d5db",
    ...options,
  });
};

export default themedSwal;
