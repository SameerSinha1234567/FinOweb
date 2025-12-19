const mongoose = require("mongoose");
const Asset = require("../modules/Assets");
const Liability = require("../modules/Liabilities");

const getNetWorth = async (req, res) => {
  try {
    const { accountId } = req.body;

    if (!accountId) return res.status(400).json({ message: "Account ID required" });

    const assets = await Asset.find({ owner: accountId });
    const liabilities = await Liability.find({ owner: accountId });

    const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);

    const netWorth = totalAssets - totalLiabilities;

    res.status(200).json({
      totalAssets,
      totalLiabilities,
      netWorth,
      assets,
      liabilities
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate net worth" });
  }
};

module.exports = { getNetWorth };
