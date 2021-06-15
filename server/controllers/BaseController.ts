import HttpException from "../exceptions/HttpException";
import { ApiResponse } from "../interface/Response";

export class BaseController {
    constructor() {
        
    }

    /**
     * 
     * @param err HttpException
     * @returns 
     */
    mapErrorResponse(err: HttpException) {
        return {
            success: false,
            message: err.message,
            errorCode: err.errorCode
        }
    }

    /**
     * 
     * @param success boolean
     * @param message string
     * @param data any | any[]
     * @returns 
     */
    mapApiResponse(success:boolean, message:string, data?:any | any[]) : ApiResponse {
        return {success, message, data} ;
    }
}