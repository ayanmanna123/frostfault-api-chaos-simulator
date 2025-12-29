const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const mockRoutes = require("./routes/mock.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/mock", mockRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Chaos Engineering Simulator Backend is running 🚀" });
});

module.exports = app;

