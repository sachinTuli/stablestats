import { PLANTYPE } from './../constants/PlanType';

export interface Package {
    planType: PLANTYPE,
    amount: number,
    title?: string;
    description?: string;
    image?: string;
    expirationTime: Number; // 1, 14, 1
    expirationType: String; // days, year

}
