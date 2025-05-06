


export const dateConverter = (dueDate) => {
    const months = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };

    const parts = dueDate.split(" ");
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1]];
    const year = parts[2];

    return `${year}${month}${day}`;
}

export const todayDate = () => {    /* 06 May */
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleDateString('default', { month: 'long' });
    return `${day} ${month}`;
}

export const todayDateFormat = () => {  /* 06/05/2025 */
    const date = new Date();
    const day = String(date.getDate()).padStart(2, 0);
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const dateFormatForSend = (date) => { /* 2025-05-06T17:03:12.487Z to 20250506 */
    const dt = new Date(date);
    const day = String(dt.getDate()).padStart(2, 0);
    const month = String(dt.getMonth() + 1).padStart(2, 0);
    const year = dt.getFullYear();
    return `${year}${month}${day}`;
}

export const formatDate = (date) => {  /* 2025-05-06T16:01:00.000Z to 06/05/2025 */
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};