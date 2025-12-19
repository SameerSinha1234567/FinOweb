const express = require("express");
const cors = require("cors");
const sessionRoutes = require("./api/sessionRoutes");
const dashboardRoutes = require("./api/dashboardRoutes");
const assetRoutes = require("./api/assetRoutes");
const liabilityRoutes = require("./api/liabilityRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", sessionRoutes);

app.use("/api", dashboardRoutes);
app.use("/api", assetRoutes);
app.use("/api", liabilityRoutes);
app.use("/api/planning", require("./api/planningRoutes"));

app.get("/health", (req, res) => {
  res.json({ service: "FinoWeb", status: "running" });
});

module.exports = app;


