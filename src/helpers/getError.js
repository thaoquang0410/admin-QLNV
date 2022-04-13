const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;

const getError = (status) => {
    switch (status) {
        case NOT_FOUND:
        return 'Not Found';

        case UNAUTHORIZED:
        return 'Unauthorized';

        case SERVER_ERROR:
        return 'Internal Server Error';

        case BAD_REQUEST:
        return 'Bad Request';

        default: return 'Unknown Error';
    }
};

export default getError;
