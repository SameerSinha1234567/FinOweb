const { sipCalculator, fireCalculator } = require("./rules");
const { askAIPlanner } = require("./aiPlanner");

const planFinance = async (req, res) => {
  try {
    
    const { type, data, question, context } = req.body || {};

    if (!type) return res.status(400).json({ message: "Type missing" });

    if (type === "SIP_TARGET") {
      if (!data) return res.status(400).json({ message: "Data missing for SIP_TARGET" });
      const sip = sipCalculator(data.targetAmount, data.years);
      return res.json({ mode: "RULES", result: { monthlyInvestment: sip } });
    }

    if (type === "FIRE") {
      if (!data) return res.status(400).json({ message: "Data missing for FIRE" });
      const fireAmount = fireCalculator(data.annualExpense);
      return res.json({ mode: "RULES", result: { fireCorpus: fireAmount } });
    }

    if (type === "AI_QUERY") {
      if (!question) return res.status(400).json({ message: "Question missing for AI_QUERY" });
      const aiResponse = await askAIPlanner(question, context);
      return res.json({ mode: "AI", result: aiResponse });
    }

    return res.status(400).json({ message: "Invalid type" });
  } catch (err) {
    console.error("PlannerController Error:", err);
    return res.status(500).json({ message: "Planning failed" });
  }
};

module.exports = { planFinance };


