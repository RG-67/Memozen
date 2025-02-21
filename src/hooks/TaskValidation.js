


export const taskValidation = (title, description) => {
    if (title === "") {
        return 'Title should not empty';
    } else if (description === "") {
        return 'Description should not empty';
    }
    return '';
}