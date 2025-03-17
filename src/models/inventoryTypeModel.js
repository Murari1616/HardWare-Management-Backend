const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      immutable: true,
    },

    typeName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const TypeModel = mongoose.model("Type", TypeSchema);
module.exports = TypeModel;
