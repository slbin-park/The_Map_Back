const response = ({ isSuccess, code, msg }, result) => {
    return {
        isSuccess,
        code,
        msg,
        result,
    };
};

const errResponse = ({ isSuccess, code, msg }) => {
    return {
        isSuccess,
        code,
        message,
    };
};

export { response, errResponse };
