const formatCurrency = (amount) => {
    return (amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
    });
};

export default formatCurrency;