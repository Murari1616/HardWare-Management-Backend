const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      default: uuidv4,
      unique: true,
      immutable: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
