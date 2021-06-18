import mongoose, { Schema } from "mongoose";
import { PAYMENT_STATUS } from "../constants/Payment";
import { PLANTYPE } from "../constants/PlanType";

const Payment = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  planType: {
    type: PLANTYPE,
  },
  sttaus: {
      type: PAYMENT_STATUS
  },
  stripeData: {
      type: String
  }
});

const UserModel = mongoose.model("user", Payment);

export default UserModel;
