import { ERROR_MESSAGE } from './../constants/ErrorMessage';
import UserModel from '../models/user';
import bcrypt from 'bcryptjs';
import { User } from '../interface/user.interface';
import express from 'express';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { PLANTYPE } from '../constants/PlanType';
import HttpException from '../exceptions/HttpException';
import { HTTP_STATUS } from '../constants/ErrorStatus';
import moment from 'moment';

class UserService {

    constructor() {

    }
    
    /**
     * 
     * @param accessToken string
     * @param refreshToken string
     * @param userProfile any
     * @returns Promise<User>
     */
    public async registerNewDiscordUser(accessToken:string, refreshToken:string, userProfile:any) : Promise<User>  {
        console.log(accessToken, refreshToken ,userProfile);

        //NEED TO UPDATE THIS PASSWORD AND PHONE NUMBER
        var hasPassword = await bcrypt.hash(userProfile.id, 12);
        const newUser = new UserModel({
            name:userProfile.username,
            email: userProfile.email,
            password: hasPassword,
            phoneNumber: userProfile.id,
            discordId:userProfile.id
        })
    
        const savedUser:User = await newUser.save();
        return savedUser;
    }

    /**
     * 
     * @param req 
     * @returns 
     */

    public async curruntUser(req: express.Request): Promise<User> {
        const session_user:User = req.user as User;
        const user:User = await UserModel.findOne({email: session_user.email});
        if(!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    /**
     * 
     * @param req 
     * @returns 
     */

    public async setPackage(req: express.Request): Promise<User> {
        const session_user:User = req.user as User;
        const user:User = await UserModel.findOne({email: session_user.email});
        if(!user) {
            throw new UserNotFoundException();
        }
        if (user.planType && user.planType !== null) {
            if (req.body.planType == PLANTYPE.FREE || req.body.planType == PLANTYPE.TRIAL) {
                throw new HttpException(HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGE.PACKAGE_NOT_UPDATED);
            }
        }
        let planType = user.planType = req.body.package.planType;
        let now = moment(); 
        let expiryTime = user.expiryDate = now.add(req.body.package.expirationTime, req.body.package.expirationType).valueOf();
        await UserModel.updateOne({ _id: user._id }, { planType: planType, expiryDate: expiryTime });
        return user;
    }
}

export default new UserService();
