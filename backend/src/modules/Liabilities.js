const mongoose = require("mongoose");

const liabilitySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    type: { type: String, required: true }, 
    name: { type: String, required: true }, 
    amount: { type: Number, required: true }, 
    createdOn: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Liability", liabilitySchema);
