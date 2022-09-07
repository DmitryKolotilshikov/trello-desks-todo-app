export const getDate = () => {
    const date = new Date();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    return date.toLocaleString('en', options)
};