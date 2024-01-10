import moment from 'moment';

const toLocaleDate = (date) => {
    return moment(date).format('YYYY-MM-DD') + 'T00:00:00.000Z';
};

export default {
    toLocaleDate
};