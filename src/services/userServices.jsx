import api from "./api";

const getUserDashboardData = async () => {
  const [userRes, balanceRes, historyRes] = await Promise.all([
    api.get("/user"),
    api.get("/balance"),
    api.get("/trans-history"),
  ]);
  return {
    ...userRes.data.user,
    balance: balanceRes.data.balance,
    accountNum: balanceRes.data.accountNum,
    transferHistory: historyRes.data.transferHistory || [],
  };
}
  export default getUserDashboardData;