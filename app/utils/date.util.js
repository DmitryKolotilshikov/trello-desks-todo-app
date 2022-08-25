export const setTodoDate = (locale = 'ru') => {
    const date = new Date();
    const dateOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleString(locale, dateOptions);
}