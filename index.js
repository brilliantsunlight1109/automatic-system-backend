const express = require("express");
const connectDB = require("./config/db");
connectDB();
const Style = require("./Routes/Style");
const Blog = require("./Routes/Blog");
const Stylist = require("./Routes/Stylist");
const Coupon = require("./Routes/Coupon");
const SyncTime = require("./Routes/SyncTime");
const ServerControl = require("./Routes/ServerControl");
const Delete = require("./Routes/Delete");
// const Control = require("./Routes/Control");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const { MONGO_URL, PORT } = process.env;

// Define your backend routes

// Serve the index.html file for all routes

app.use(
  cors({
    origin: [
      "https://os3-318-48579.vs.sakura.ne.jp:3000",
      "https://localhost:3000",
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:4001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.use("/api/user", authRoute);
app.use("/images", express.static("images"));

// app.use("/public", express.static("public"));

app.use("/api/style", Style);

app.use("/api/blog", Blog);

app.use("/api/stylist", Stylist);

app.use("/api/coupon", Coupon);

app.use("/api/synctime", SyncTime);

app.use("/api/severcontrol", ServerControl);

app.use("/api/delete", Delete);

// app.use("/api1/control", Control);

// app.use(express.static(path.join(__dirname, "../vite-project/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../vite-project/dist/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
