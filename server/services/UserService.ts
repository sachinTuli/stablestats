import UserModel from '../models/user';
import bcrypt from 'bcryptjs';
import { User } from '../interface/user.interface';
import express from 'express';
import UserNotFoundException from '../exceptions/UserNotFoundException';

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

    public async curruntUser(req: express.Request): Promise<User> {
        const session_user:User = req.user as User;
        const user:User = await UserModel.findOne({email: session_user.email});
        if(!user) {
            throw new UserNotFoundException();
        }
        return user;
    }
}

export default new UserService(); 