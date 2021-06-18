import { ERROR_MESSAGE } from './../constants/ErrorMessage';
import { ERROR_CODE, HTTP_STATUS } from './../constants/ErrorStatus';
import HttpException from "./HttpException";

class IncorrectPasswordException extends HttpException {
    constructor() {
        super(HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGE.INCORRECT_PASSWORD, ERROR_CODE.INCORRECT_PASSWORD);
    }
}

export default IncorrectPasswordException;