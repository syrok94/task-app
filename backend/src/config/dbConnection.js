const mongoose = require("mongoose");
require("dotenv").config();

// function to connect with the database
const connectDb = async () => {
  const URI = process.env.URI;

  try {
    const connect = await mongoose.connect(URI);
    console.log(
      `Database connected : `,
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
