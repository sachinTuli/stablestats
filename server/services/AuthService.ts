import express from 'express'
import UserModel from '../models/user';
import bcrypt from 'bcryptjs';
import { User } from '../interface/user.interface';
import UserExistException from '../exceptions/UserExistException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import IncorrectPasswordException from '../exceptions/IncorrectPasswordException';
import moment from 'moment';
class AuthService  {

    /**
     * 
     * @param req Request
     * @returns Promise<User>
     */
    public async register(req:express.Request) : Promise<User> {
        const { name, email, password, phoneNumber } = req.body;
        let user: User; 
        user = await UserModel.findOne({email:email});
        if(user) {
            throw new UserExistException(user.email);
        } else {
            let hasPassword:string;
            hasPassword = await bcrypt.hash(password, 12);
            const newUser = new UserModel({
                name:name,
                email: email,
                password: hasPassword,
                phoneNumber: phoneNumber,
                loginCount: 1,
            })
            let savedUser: User = await newUser.save();            
            req.login(user, function (err) {
                console.log(err);
            });
            savedUser.dashboardShow = false;
            console.log(savedUser);
            return savedUser;

        } 
    }

    /**
     * 
     * @param req Request
     * @returns  Promise<User>
     */
    public async login(req:express.Request) : Promise<User> {
        const { username, password } = req.body;
        let user: User;
        user = await UserModel.findOne({email:username});
        if(!user) {
           throw new UserNotFoundException();
        } else {
            let matchedPassword = await bcrypt.compare(password, user.password);
            if(!matchedPassword) {
                throw new IncorrectPasswordException()
            } else {
                req.login(user, function(err) {
                    console.log(err);
                })                
                let loginCount = user.loginCount = Number(user.loginCount) + 1;
                await UserModel.updateOne({ _id: user._id }, { loginCount: loginCount });
                const now = moment().valueOf();
                if (user.expiryDate && user.expiryDate !== null && user.expiryDate > now) {
                    user.dashboardShow = true;
                } else {
                    user.dashboardShow = false;
                }
                return user;
            }
        }
         
    }
}

export default new AuthService();