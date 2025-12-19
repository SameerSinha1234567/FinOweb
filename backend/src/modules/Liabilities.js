const mongoose = require("mongoose");

const liabilitySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    type: { type: String, required: true }, // e.g., "loan", "credit"
    name: { type: String, required: true }, // e.g., "Car Loan"
    amount: { type: Number, required: true }, // Outstanding amount
    createdOn: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Liability", liabilitySchema);
