import moment from 'moment';

export const convertDate = (dateStr) =>{
    const date =  new Date(dateStr);
    const dateFormat = "DD/MM/YYYY";
    return moment(date).format(dateFormat);
}
export const convertDateComments = (dateStr) =>{
    const date =  new Date(dateStr);
    const dateFormat = "DD/MM/YYYY HH:mm:ss";
    return moment(date).format(dateFormat);
}
export const convertDateInput = (dateStr) => {
    const date =  new Date(dateStr);
    const dateFormat = "YYYY-MM-DD";
    return moment(date).format(dateFormat);
}