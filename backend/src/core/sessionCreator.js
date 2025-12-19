const bcrypt = require("bcryptjs");
const Account = require("../modules/Account");

const createSession = async (req, res) => {
  try {
    const { handle, email, secret } = req.body;

    if (!handle || !email || !secret)
      return res.status(400).json({ message: "Incomplete data" });

    const existing = await Account.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Account already exists" });

    const hashedSecret = await bcrypt.hash(secret, 10);

    const account = await Account.create({
      handle,
      email,
      secret: hashedSecret
    });

    res.status(201).json({
      message: "Account created",
      accountId: account._id
    });
  } catch (err) {
    res.status(500).json({ message: "Session creation failed" });
  }
};

module.exports = { createSession };
