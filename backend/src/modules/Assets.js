const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    type: { type: String, required: true }, // e.g., "stock", "bank", "cash"
    name: { type: String, required: true }, // e.g., "TCS", "HDFC"
    value: { type: Number, required: true }, // Current value in INR
    createdOn: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Asset", assetSchema);
