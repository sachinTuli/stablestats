import express from 'express'
import UserModel from '../models/user';
import bcrypt from 'bcryptjs';
import * as jwt from "jwt-simple";
import { Error } from 'mongoose';
import { User } from '../interface/user.interface';

class AuthService {

    /**
     * 
     * @param req 
     * @returns 
     */
    public async register(req:express.Request) : Promise<any> {
        const { name, email, password, phoneNumber } = req.body;
        try {
            const user = await UserModel.findOne({email:email});
            if(user) {
                return {
                    success:false,
                    message:"User already exist. Please login."
                };
            } else {
                var hasPassword = await bcrypt.hash(password, 12);
                const newUser = new UserModel({
                    name:name,
                    email: email,
                    password: hasPassword,
                    phoneNumber: phoneNumber
                })
                await newUser.save();
                return {
                    success:true,
                    message:"User Register."
                }

            }
        } catch (error) {
            throw new Error("Internal Server Error");   
        }
    }

    /**
     * 
     * @param req 
     * @returns user with token
     */
    public async login(req:express.Request) : Promise<any> {
        const { username, password } = req.body;
        try {
            const user:User = await UserModel.findOne({email:username});
            if(!user) {
                return {
                    success: false,
                    message: "User doesn't exists."
                }
            } else {
                let matchedPassword = await bcrypt.compare(password, user.password)
                if(!matchedPassword) {
                    return {
                        success: false,
                        message: "Incorrect password."
                    }
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
        } catch(err) {
            throw new Error("Internal Server Error");
        }
    }
}

export default new AuthService();