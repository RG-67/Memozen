


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

export const todayDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleDateString('default', { month: 'long' });
    return `${day} ${month}`;
}