const webPush = require('web-push');
const dotenv =require('dotenv');

dotenv.config();

const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;
console.log("🟡 Public Key:", publicKey);
console.log("🟡 Private Key:", privateKey);

if (!publicKey || !privateKey) {
  console.error("VAPID keys are missing in .env");
}

webPush.setVapidDetails(
  "mailto:murarikunchapu@gmail.com",
  publicKey,
  privateKey
);
const sendPushNotification = async (subscription, dataToSend) => {
  try {
    const headers = webPush.getVapidHeaders(
      new URL(subscription.endpoint).origin,
      'mailto:murarikunchapu@gmail.com',
      publicKey,
      privateKey,
      'aes128gcm'
    );
    await webPush.sendNotification(subscription, dataToSend);
  } catch (err) {
    console.error('Push Notification Error:', err);
  }
};

module.exports = { sendPushNotification };