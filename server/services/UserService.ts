import UserModel from '../models/user';
import * as jwt from "jwt-simple";
import bcrypt from 'bcryptjs';

class UserService {
    async registerNewDiscordUser(accessToken:string, refreshToken:string, userProfile:any) {
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
                 const token = jwt.encode({
                            name: newUser.name,
                            email: newUser.email,
                            phoneNumber: newUser.phoneNumber
                    }, process.env.JWT_SECRET as string);
                    
                newUser.token.push({token: token});
                await newUser.save();
        console.log("user saved successfully")
        return userProfile;
    }
}

export default new UserService(); 