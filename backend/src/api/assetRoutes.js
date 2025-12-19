const express = require("express");
const router = express.Router();
const Asset = require("../modules/Assets");

// Add an asset
router.post("/asset/add", async (req, res) => {
  try {
    const { accountId, type, name, value } = req.body;
    if (!accountId || !type || !name || value == null)
      return res.status(400).json({ message: "Incomplete data" });

    const asset = await Asset.create({
      owner: accountId,
      type,
      name,
      value
    });

    res.status(201).json({ message: "Asset added", asset });
  } catch (err) {
    res.status(500).json({ message: "Failed to add asset", error: err.message });
  }
});

// Update an asset
router.put("/asset/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const asset = await Asset.findByIdAndUpdate(id, updates, { new: true });
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    res.status(200).json({ message: "Asset updated", asset });
  } catch (err) {
    res.status(500).json({ message: "Failed to update asset", error: err.message });
  }
});

// Delete an asset
router.delete("/asset/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findByIdAndDelete(id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    res.status(200).json({ message: "Asset deleted", asset });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete asset", error: err.message });
  }
});
// Get assets by account (owner)
router.get("/assets/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;

    const assets = await Asset.find({ owner: accountId });

    res.status(200).json({ assets });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assets" });
  }
});

module.exports = router;
