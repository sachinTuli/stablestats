import mongoose, { Schema } from "mongoose";

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
    token: [{
        token: {
            type:String
        }
    }]
});

const UserModel = mongoose.model('user', User);

export default UserModel;