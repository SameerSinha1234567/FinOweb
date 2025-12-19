

const sipCalculator = (target, years, annualReturn = 0.12) => {
  const months = years * 12;
  const monthlyRate = annualReturn / 12;

  const sip =
    target *
    monthlyRate /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(sip);
};

const fireCalculator = (annualExpense, returnRate = 0.10) => {
  return annualExpense * 25;
};

module.exports = {
  sipCalculator,
  fireCalculator
};
