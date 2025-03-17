const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    typeId: {
      type: String,
      required: true,
    },

    workName: {
      type: String,
      required: true,
      trim: true,
    },

    rent: {
      type: String,
      required: true,
    },

    advance: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const workModel = mongoose.model("Work", workSchema);
module.exports = workModel;
