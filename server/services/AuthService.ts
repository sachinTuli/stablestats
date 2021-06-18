import express from 'express'
import UserModel from '../models/user';
import bcrypt from 'bcryptjs';
import { User } from '../interface/user.interface';
import UserExistException from '../exceptions/UserExistException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import IncorrectPasswordException from '../exceptions/IncorrectPasswordException';
class AuthService  {

    /**
     * 
     * @param req Request
     * @returns Promise<boolean>
     */
    public async register(req:express.Request) : Promise<boolean> {
        const { name, email, password, phoneNumber } = req.body;
        let user:any;
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
            })
            await newUser.save();            
            return true;

        } 
    }

    /**
     * 
     * @param req Request
     * @returns  Promise<User>
     */
    public async login(req:express.Request) : Promise<User> {
        const { username, password } = req.body;
        let user:User;
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
                console.log(user);
                return user;
            }
        }
         
    }
}

export default new AuthService();