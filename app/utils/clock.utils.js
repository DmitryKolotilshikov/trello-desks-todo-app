import { clockLayout } from '../elements.js';

export const clock = () => {
    clockLayout.clear();

    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    clockLayout.insertHTML('afterbegin', `
        ${hours}:${minutes}:${seconds}
    `);
}
