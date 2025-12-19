const express = require("express");
const router = express.Router();
const Liability = require("../modules/Liabilities");


router.post("/liability/add", async (req, res) => {
  try {
    const { accountId, type, name, amount } = req.body;
    if (!accountId || !type || !name || amount == null)
      return res.status(400).json({ message: "Incomplete data" });

    const liability = await Liability.create({
      owner: accountId,
      type,
      name,
      amount
    });

    res.status(201).json({ message: "Liability added", liability });
  } catch (err) {
    res.status(500).json({ message: "Failed to add liability", error: err.message });
  }
});


router.put("/liability/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const liability = await Liability.findByIdAndUpdate(id, updates, { new: true });
    if (!liability) return res.status(404).json({ message: "Liability not found" });

    res.status(200).json({ message: "Liability updated", liability });
  } catch (err) {
    res.status(500).json({ message: "Failed to update liability", error: err.message });
  }
})

router.delete("/liability/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const liability = await Liability.findByIdAndDelete(id);
    if (!liability) return res.status(404).json({ message: "Liability not found" });

    res.status(200).json({ message: "Liability deleted", liability });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete liability", error: err.message });
  }
});
router.get("/liabilities/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;

    const liabilities = await Liability.find({ owner: accountId });

    res.status(200).json({ liabilities });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch liabilities" });
  }
});
module.exports = router;
