import { ERROR_MESSAGE } from '../constants/ErrorMessage';
import { ERROR_CODE, HTTP_STATUS } from './../constants/ErrorStatus';
import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
    constructor() {
        super(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGE.USER_NOT_FOUND, ERROR_CODE.USER_NOT_FOUND);
    }
}

export default UserNotFoundException;