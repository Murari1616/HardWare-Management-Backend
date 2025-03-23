const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    inTime: {
      type: String, 
      required: true,
    },
    
    outTime: {
      type: String, 
      default : null,
    },    
    customerName: {
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
    Aadhar: {
      type: Boolean,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Type",
    },
    workId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Work",
    },
    rent: {
      type: String,
      required: true,
    },
    advance: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    rentToBePaid: {
      type: String,
      default: 0,
    },
    totalRentDays: {
      type: Number,
      default: 1,
    },
    closingAmount: {
      type: String,
      default: null,
    },
    referenceName: {
      type: String,
      default: null,
    },
    additionalInfo: {
      type: String,
      default: null,
    },
    referencePhoneNumber: {
      type: String,
      default: null,
    },
    cancelRentRecord: {
      type: Boolean,
      default: false,
    },
    extras: {
      type: String,
      default: null,
    },
    extraCost: {
      type: Number,
      default: 0,
    },
    local: {
      type: Boolean,
      default: null,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

const rentModel = mongoose.model("Rent", rentSchema);
module.exports = rentModel;
