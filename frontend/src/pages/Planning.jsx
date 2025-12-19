import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const FIRE_TARGET = 50000000; 

function Planning() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const assets = state?.assets || [];
  const liabilities = state?.liabilities || [];
  const netWorth = state?.netWorth || 0;

  const totalAssets = assets.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.amount, 0);
  const monthlySavings = Math.max(totalAssets - totalLiabilities, 0);

  const [question, setQuestion] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState("");


  const handlePreQuestion = (type) => {
    if (type === "fire") {
      if (netWorth >= FIRE_TARGET) {
        setAnswer("FIRE achieved! You are financially independent.");
      } else {
        const remaining = FIRE_TARGET - netWorth;
        const years = (remaining / (monthlySavings * 12 || 1)).toFixed(1);
        setAnswer(
          `To achieve FIRE (₹5 Cr), you need ₹${remaining.toLocaleString()} more. At your current savings rate, it may take ~${years} years.`
        );
      }
    }

    if (type === "monthly") {
      setAnswer(
        `Based on your data, you can save approximately ₹${monthlySavings.toLocaleString()} per month.`
      );
    }

    if (type === "stability") {
      if (netWorth > 0) {
        setAnswer("You are financially stable with positive net worth.");
      } else {
        setAnswer("Your liabilities outweigh assets. Focus on stability.");
      }
    }
  };

 
  const handleNext = () => {
    if (!question) return;
    setStep(2);
  };

  const handleEvaluate = () => {
    const required = Number(amount);
    if (!required) return;

    if (required <= netWorth * 0.2) {
      setAnswer("This goal is financially comfortable for you.");
    } else if (required <= netWorth * 0.5) {
      setAnswer("Achievable, but requires careful planning.");
    } else {
      setAnswer("Not advisable. This may strain your finances.");
    }
  };

  return (
    <div style={pageStyle}>
      <button style={backBtn} onClick={() => navigate("/")}>
        ← Back to Dashboard
      </button>

      <h1 style={titleStyle}> Smart Financial Planning </h1>

   
      <div style={preBox}>
        <button style={preBtn} onClick={() => handlePreQuestion("fire")}>
          Can I achieve FIRE?
        </button>
        <button style={preBtn} onClick={() => handlePreQuestion("monthly")}>
          How much can I save monthly?
        </button>
        <button style={preBtn} onClick={() => handlePreQuestion("stability")}>
          How financially stable am I?
        </button>
      </div>

      <div style={cardStyle}>
        {step === 1 && (
          <>
            <input
              placeholder="Ask any financial question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={inputStyle}
            />
            <button style={smallBtn} onClick={handleNext}>
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{ fontWeight: 600 }}>How much money is needed? (₹)</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
            <button style={smallBtn} onClick={handleEvaluate}>
              Evaluate
            </button>
          </>
        )}

        {answer && <div style={answerBox}>{answer}</div>}
      </div>
    </div>
  );
}


const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f4f9ff, #e8f1ff)",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "32px",
  marginBottom: "40px",   
  textAlign: "center"
};

const preBox = {
  display: "flex",
   flexDirection: "column",
  gap: "10px",
  marginBottom: "80px",
  width: "360px",
};

const preBtn = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  background: "#e0e7ff",
  cursor: "pointer",
  fontSize: "14px",
};

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "14px",
  width: "360px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #c7d2fe",
};

const smallBtn = {
  padding: "8px 16px",
  width: "fit-content",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const answerBox = {
  marginTop: "10px",
  padding: "12px",
  background: "#f0f6ff",
  borderRadius: "8px",
};

const backBtn = {
  alignSelf: "flex-start",
  marginBottom: "15px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#e5e7eb",
  cursor: "pointer",
};

export default Planning;


