import UserModel from '../models/user';
import * as jwt from "jwt-simple";
import bcrypt from 'bcryptjs';

class UserService {
    
    
    public async registerNewDiscordUser(accessToken:string, refreshToken:string, userProfile:any) : Promise<any>  {
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
                    
            await    newUser.token.push({token: token});
            const savedUser =    await newUser.save();
        console.log("user saved successfully"+savedUser)
        return savedUser;
    }
}

export default new UserService(); 