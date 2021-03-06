import mongoose, { Schema } from "mongoose";
import { PLANTYPE } from "../constants/PlanType";

const User = new Schema({
    name: {
        type:String,
        require:true,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type:String,
        require:true
    },
    phoneNumber: {
        type:Number,
        require:true
    },
    discordId : {
        type:String
    },
    token: {
        type:String
    },
    loginCount: {
        type:Number
    },
    planType: {
        type:PLANTYPE
    },
    expiryDate:{
        type:Date
    }
        
    
});

const UserModel = mongoose.model('user', User);

export default UserModel;