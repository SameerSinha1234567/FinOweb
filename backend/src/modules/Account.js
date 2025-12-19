const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    handle: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    secret: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Account", accountSchema);
