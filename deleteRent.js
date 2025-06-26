require('dotenv').config();
const mongoose = require('mongoose');

// Replace with your actual Rent model path
const Rent = require('./src/models/rentModel');

const deleteAllRents = async () => {
  try {
    await mongoose.connect(process.env.DEVELOPMENT_DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Rent.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} rent(s) from the database.`);

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error deleting rents:', error);
    process.exit(1);
  }
};

deleteAllRents();
