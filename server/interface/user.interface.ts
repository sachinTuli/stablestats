import { PLANTYPE } from "../constants/PlanType";

export interface User {
    _id : string;
    name : string, 
    password : string,
    phoneNumber : number,
    email : string,
    token: any,
    loginCount: Number,
    planType: PLANTYPE,
    expiryDate: Number,
    dashboardShow?: boolean
}