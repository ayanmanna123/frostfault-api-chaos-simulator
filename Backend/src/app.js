const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const mockRoutes = require("./routes/mock.routes");
const serveMockRoutes = require("./routes/serveMock.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/mock", mockRoutes);
app.use("/mock", serveMockRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use(errorHandler);


app.get("/", (req, res) => {
  res.json({ message: "API Chaos Engineering Simulator Backend is running 🚀" });
});

module.exports = app;