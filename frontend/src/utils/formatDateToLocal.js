const formatDateToLocal = (dateStr) => {
    const date = new Date(dateStr); // Convert MongoDB date to JavaScript Date object
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; // Options for formatting
    return date.toLocaleDateString('en-US', options);
};

export default formatDateToLocal;