import HttpException from "./HttpException";
import { ERROR_CODE, HTTP_STATUS } from './../constants/ErrorStatus';
import { ERROR_MESSAGE } from "../constants/ErrorMessage";

class UserExistException extends HttpException {
    constructor(email:string) {
        let msg = ERROR_MESSAGE.USER_EXISTS;
        msg = msg.replace("${email}", email);
        super(HTTP_STATUS.NOT_FOUND, msg, ERROR_CODE.USER_EXISTS);
    }
}

export default UserExistException;