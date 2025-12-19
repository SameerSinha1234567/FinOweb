import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAssets,
  fetchLiabilities,
  addAsset,
  addLiability,
  updateAsset,
  deleteAsset,
  updateLiability,
  deleteLiability
} from "../services/api";

const ACCOUNT_ID = "6943c7371a4617ba07cab7ee";

function Dashboard() {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [netWorth, setNetWorth] = useState(0);

  const [newAsset, setNewAsset] = useState({ name: "", value: "" });
  const [newLiability, setNewLiability] = useState({ name: "", amount: "" });

  const [editingAssetId, setEditingAssetId] = useState(null);
  const [editingLiabilityId, setEditingLiabilityId] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const assetRes = await fetchAssets(ACCOUNT_ID);
      const liabilityRes = await fetchLiabilities(ACCOUNT_ID);

      const assetsData = assetRes.data.assets || assetRes.data || [];
      const liabilitiesData = liabilityRes.data.liabilities || liabilityRes.data || [];

      setAssets(assetsData);
      setLiabilities(liabilitiesData);

      const totalAssets = assetsData.reduce((s, a) => s + a.value, 0);
      const totalLiabilities = liabilitiesData.reduce((s, l) => s + l.amount, 0);
      setNetWorth(totalAssets - totalLiabilities);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  const handleAddAsset = async () => {
    if (!newAsset.name || !newAsset.value) return;
    await addAsset({ accountId: ACCOUNT_ID, type: "income", name: newAsset.name, value: Number(newAsset.value) });
    setNewAsset({ name: "", value: "" });
    loadData();
  };

  const handleAddLiability = async () => {
    if (!newLiability.name || !newLiability.amount) return;
    await addLiability({ accountId: ACCOUNT_ID, type: "expense", name: newLiability.name, amount: Number(newLiability.amount) });
    setNewLiability({ name: "", amount: "" });
    loadData();
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}> Net Worth Dashboard</h1>

      <div style={sectionRow}>
      
        <div style={sectionCard}>
          <h2 style={sectionTitle}>Assets</h2>
          {assets.map(asset => (
            <div key={asset._id} style={itemCard}>
              {editingAssetId === asset._id ? (
                <>
                  <input
                    value={asset.name}
                    onChange={(e) =>
                      setAssets(prev => prev.map(a => a._id === asset._id ? { ...a, name: e.target.value } : a))
                    }
                    style={editInput}
                  />
                  <input
                    type="number"
                    value={asset.value}
                    onChange={(e) =>
                      setAssets(prev => prev.map(a => a._id === asset._id ? { ...a, value: Number(e.target.value) } : a))
                    }
                    style={editInput}
                  />
                  <button
                    style={saveBtn}
                    onClick={async () => {
                      await updateAsset(asset._id, asset);
                      setEditingAssetId(null);
                      loadData();
                    }}
                  >Save</button>
                </>
              ) : (
                <>
                  <span>{asset.name}</span>
                  <strong>₹ {asset.value}</strong>
                  <div>
                    <button style={editBtn} onClick={() => setEditingAssetId(asset._id)}>Edit</button>
                    <button style={deleteBtn} onClick={async () => { await deleteAsset(asset._id); loadData(); }}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
          <div style={formBox}>
            <input placeholder="Asset name" value={newAsset.name} onChange={e => setNewAsset({ ...newAsset, name: e.target.value })} style={inputStyle} />
            <input placeholder="Value" type="number" value={newAsset.value} onChange={e => setNewAsset({ ...newAsset, value: e.target.value })} style={inputStyle} />
            <button style={addBtn} onClick={handleAddAsset}>+ Add Asset</button>
          </div>
        </div>

       
        <div style={sectionCard}>
          <h2 style={sectionTitle}>Liabilities</h2>
          {liabilities.map(liability => (
            <div key={liability._id} style={itemCard}>
              {editingLiabilityId === liability._id ? (
                <>
                  <input
                    value={liability.name}
                    onChange={e => setLiabilities(prev => prev.map(l => l._id === liability._id ? { ...l, name: e.target.value } : l))}
                    style={editInput}
                  />
                  <input
                    type="number"
                    value={liability.amount}
                    onChange={e => setLiabilities(prev => prev.map(l => l._id === liability._id ? { ...l, amount: Number(e.target.value) } : l))}
                    style={editInput}
                  />
                  <button style={saveBtn} onClick={async () => { await updateLiability(liability._id, liability); setEditingLiabilityId(null); loadData(); }}>Save</button>
                </>
              ) : (
                <>
                  <span>{liability.name}</span>
                  <strong>₹ {liability.amount}</strong>
                  <div>
                    <button style={editBtn} onClick={() => setEditingLiabilityId(liability._id)}>Edit</button>
                    <button style={deleteBtn} onClick={async () => { await deleteLiability(liability._id); loadData(); }}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
          <div style={formBox}>
            <input placeholder="Liability name" value={newLiability.name} onChange={e => setNewLiability({ ...newLiability, name: e.target.value })} style={inputStyle} />
            <input placeholder="Amount" type="number" value={newLiability.amount} onChange={e => setNewLiability({ ...newLiability, amount: e.target.value })} style={inputStyle} />
            <button style={addBtn} onClick={handleAddLiability}>+ Add Liability</button>
          </div>
        </div>
      </div>

      <div style={netWorthCard}>
        <span>Net Worth</span>
        <h2>₹ {netWorth}</h2>
      </div>

      
     <button
  style={nextPageBtn}
  onClick={() => navigate("/planning", { state: { assets, liabilities, netWorth } })}
>
  Next Page 
</button>

    </div>
  );
}


const pageStyle = { minHeight: "100vh", background: "linear-gradient(135deg, #e8f1ff, #f4f9ff)", padding: "40px", fontFamily: "Inter, sans-serif" };
const titleStyle = { fontSize: "32px", marginBottom: "30px" };
const sectionRow = { display: "flex", gap: "30px" };
const sectionCard = { flex: 1, background: "#fff", borderRadius: "14px", padding: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" };
const sectionTitle = { marginBottom: "15px" };
const itemCard = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", marginBottom: "10px", background: "#f0f6ff", borderRadius: "10px" };
const formBox = { marginTop: "15px" };
const inputStyle = { width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #c7d2fe" };
const addBtn = { width: "100%", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" };
const editBtn = { padding: "6px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginRight: "6px" };
const deleteBtn = { padding: "6px 12px", background: "#6b7280", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
const editInput = { width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #c7d2fe", marginBottom: "6px" };
const saveBtn = { width: "100%", padding: "8px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
const netWorthCard = { marginTop: "40px", padding: "25px", background: "#1e40af", color: "#fff", borderRadius: "16px", textAlign: "center", fontSize: "22px" };

const nextPageBtn = {
  padding: "8px 16px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  marginTop: "30px",
  alignSelf: "center"
};

export default Dashboard;


