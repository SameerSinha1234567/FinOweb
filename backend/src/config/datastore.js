const mongoose = require("mongoose");

const openDatastore = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/finoweb");
    console.log("Datastore connected");
  } catch (err) {
    console.error("Datastore connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = openDatastore;



