import express from 'express'
import UserModel from '../models/user';
import bcrypt from 'bcryptjs';
import * as jwt from "jwt-simple";
import { User } from '../interface/user.interface';
import HttpException from '../exceptions/HttpException';
import UserExistException from '../exceptions/UserExistException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import IncorrectPasswordException from '../exceptions/IncorrectPasswordException';
import { HTTP_STATUS } from '../constants/ErrorStatus';
import { ERROR_MESSAGE } from '../constants/ErrorMessage';
class AuthService  {

    /**
     * 
     * @param req 
     * @returns boolean
     */
    public async register(req:express.Request) : Promise<boolean> {
        const { name, email, password, phoneNumber } = req.body;
        let user:any;
        try {
            user = await UserModel.findOne({email:email});
        } catch {
            throw new HttpException(HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGE.INTERNET_SERVER_ERROR);
        }
 
        if(user) {
            throw new UserExistException(user.email);
        } else {
            let hasPassword:string;
            try {
                hasPassword = await bcrypt.hash(password, 12);
            } catch {
                throw new HttpException(HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGE.INTERNET_SERVER_ERROR);
            }

            const newUser = new UserModel({
                name:name,
                email: email,
                password: hasPassword,
                phoneNumber: phoneNumber,
            })
            try {
                await newUser.save();
            } catch {
                throw new HttpException(HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGE.INTERNET_SERVER_ERROR);
            }
            
            return true;

        } 
    }

    /**
     * 
     * @param req 
     * @returns user with token
     */
    public async login(req:express.Request) : Promise<User> {
        const { username, password } = req.body;
        let user:User;
        try {
            user = await UserModel.findOne({email:username});
        } catch(err) {
            throw new HttpException(HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGE.INTERNET_SERVER_ERROR);
        }
        if(!user) {
           throw new UserNotFoundException();
        } else {
            let matchedPassword = await bcrypt.compare(password, user.password);
            if(!matchedPassword) {
                throw new IncorrectPasswordException()
            } else {
                const token = jwt.encode({
                        name: user.name,
                        email: user.email,
                        phoneNumber: user.phoneNumber
                }, process.env.JWT_SECRET as string);
                user.token.push({token: token});
                return user;
            }
        }
         
    }
}

export default new AuthService();