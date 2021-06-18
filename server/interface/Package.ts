import { PLANTYPE } from './../constants/PlanType';

export interface Package {
    planType: PLANTYPE,
    amount: number,
    expirationTime: ExpireTime,
    title?: string;
    description?: string;
    image?: string;

}

export enum ExpireTime {
    ONE_DAY = 86400000,
    TWO_WEEKS = 12096000000000,
    ONE_YEAR = 315360000000000
}