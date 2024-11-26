const formatDate = (dateStr) => {
    const expenseDate = new Date(dateStr);

    const date = String(expenseDate.getDate()).padStart(2, '0');
    const month = String(expenseDate.getMonth() + 1).padStart(2, '0');
    const year = expenseDate.getFullYear();

    return `${year}-${month}-${date}`;
};

export default formatDate;