import { ERROR_CODE } from "../constants/ErrorStatus";

class HttpException extends Error {
    status: number;
    message: string;
    errorCode: number; // platforn error code
    constructor(status: number, message: string, errorCode?:number) {
      super(message);
      this.status = status;
      this.message = message;
      errorCode ? this.errorCode = errorCode : this.errorCode = ERROR_CODE.GENERAL_ERROR
    }

    toString() {
      return 'The overriden error message';
    }
  }
   
  export default HttpException;