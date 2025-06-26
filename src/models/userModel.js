const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true,
    },
    email: {
      type: String, 
      required: true,
    },
    
    password: {
      type: String, 
      required: true,
    },    
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    AadharNo: {
      type: String,
      default: null,
    },
    owner:{
     type:Number,
     default:0 
    }
    
  },
  {
    timestamps: true, 
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
