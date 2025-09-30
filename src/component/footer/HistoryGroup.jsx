const groupByDate = (transactions) => {
  return transactions.reduce((groups, tx) => {
    const date = new Date(tx.date).toDateString(); // e.g., "Thu Sep 4 2025"
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(tx);
    return groups;
  }, {});
};