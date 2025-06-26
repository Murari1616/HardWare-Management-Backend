// models/PushSubscription.js
const mongoose = require("mongoose");

const PushSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Customer" if you use different roles
    required: true,
  },
  subscription: {
    endpoint: String,
    keys: {
      auth: String,
      p256dh: String,
    },
  },
});

module.exports = mongoose.model("PushSubscription", PushSubscriptionSchema);
