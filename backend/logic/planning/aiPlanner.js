// aiPlanner.js
const askAIPlanner = async (question, context = {}) => {
  // Basic financial context
  const netWorth = context.netWorth || 0;
  const monthlySavings = context.monthlySavings || 0;

  // Normalize question for simple keyword detection
  const q = question.toLowerCase();

  let answer = "Based on your financial situation, this decision should be evaluated carefully.";

  // Rules-based dynamic responses
  if (q.includes("buy") || q.includes("purchase")) {
    if (netWorth < 500000) {
      answer = "Your net worth may not support this purchase right now. Consider saving more first.";
    } else if (monthlySavings < 20000) {
      answer = "You can buy it, but make sure it does not affect your monthly savings goals.";
    } else {
      answer = "Your finances seem sufficient for this purchase, proceed carefully.";
    }
  } else if (q.includes("invest")) {
    if (monthlySavings > 30000) {
      answer = "You can invest in mutual funds and SIPs for potentially better returns.";
    } else if (monthlySavings > 10000) {
      answer = "Consider starting with low-risk investments like debt funds or recurring deposits.";
    } else {
      answer = "Start by saving more each month before investing significant amounts.";
    }
  } else if (q.includes("retirement") || q.includes("financial independence")) {
    const yearsToFI = context.yearsToFI || 30;
    if (yearsToFI <= 10) {
      answer = "You need to save aggressively and invest wisely to reach financial independence in 10 years.";
    } else {
      answer = "Your current plan seems on track, keep following your savings and investment strategy.";
    }
  }

  // Return structured response
  return {
    answer,
    userQuestion: question,
    consideredContext: context
  };
};

module.exports = { askAIPlanner };

