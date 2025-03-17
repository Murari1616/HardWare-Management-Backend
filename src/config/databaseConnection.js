const mongoose=require('mongoose')
const dotenv =require('dotenv')

// Load environment variables from .env file
dotenv.config();

// Helper function to check if an environment variable exists
const checkEnvVar = (envVar)=> {
  const value = process.env[envVar];
  if (!value) {
    console.error(`${envVar} is not defined. Please check your environment variables.`);
    process.exit(1);
  }
  return value;
};

// MongoDB connection function
const connectDB = async () => {
  try {
  
    const NODE_ENV = checkEnvVar("NODE_ENV");

   
    const MONGODB_URI = checkEnvVar(`${NODE_ENV.toUpperCase()}_DATABASE_URI`);

   
    const options = {
      autoIndex: false, 
      socketTimeoutMS: 45000, 
      connectTimeoutMS: 30000,
      ssl: NODE_ENV === "production", // Enable SSL in production
      tls: NODE_ENV === "production", // Enable TLS in production
      tlsAllowInvalidCertificates: NODE_ENV !== "production", // Allow invalid certs in non-production
    };

    // Connect to MongoDB
    const connectionInstance = await mongoose.connect(MONGODB_URI, options);
    console.log("\n Node Environment: ", NODE_ENV); ;
    console.log(`\nMongoDB Connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("MONGODB connection error:", err);
    process.exit(1); // Exit if there is an error with the connection
  }
};

module.exports= connectDB;
