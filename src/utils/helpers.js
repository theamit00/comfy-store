export const formatPrice = (price) => {
    const newPrice = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3, style: "currency", currency: "INR"}).format(price)
    return newPrice;
}

export const getUniqueValues = (data, type) => {
    let result = data.map((item)=>item[type]);
    if(type === 'colors'){
        result = result.flat();
    }
    return ['all', ...new Set(result)];
}
