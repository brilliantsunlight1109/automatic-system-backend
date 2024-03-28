const express = require("express");
const connectDB = require("./config/db");
connectDB();
const Style = require("./Routes/Style");
const Blog = require("./Routes/Blog");
const Stylist = require("./Routes/Stylist");
const Coupon = require("./Routes/Coupon");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const { MONGO_URL, PORT } = process.env;

app.use(
  cors({
    origin: [
      "https://os3-318-48579.vs.sakura.ne.jp:3000",
      "https://localhost:3000",
      "http://localhost:3000",
      "http://localhost:4000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));

app.use("/api/user", authRoute);
app.use("/images", express.static("images"));

app.use("/api/style", Style);

app.use("/api/blog", Blog);

app.use("/api/stylist", Stylist);

app.use("/api/coupon", Coupon);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

let childProcess5000;
let childProcess5001;

const startChildProcess5000 = () => {
  if (!childProcess5000) {
    const startScriptPath = path.join(__dirname, "../index.js");
    childProcess5000 = spawn("node", [startScriptPath], {
      stdio: [0, 1, 2, "ipc"],
    });
    console.log("Child process 5000 started");

    childProcess5000.on("exit", (code) => {
      console.log(`Child process 5000 exited with code ${code}`);
      childProcess5000 = null;
    });
  } else {
    console.log("Child process 5000 is already running");
  }
};

const stopChildProcess5000 = () => {
  if (childProcess5000) {
    childProcess5000.kill();
    childProcess5000 = null;
    console.log("Child process 5000 stopped");
  } else {
    console.log("Child process 5000 is not running");
  }
};

const startChildProcess5001 = () => {
  if (!childProcess5001) {
    const start1ScriptPath = path.join(__dirname, "../main.js");
    childProcess5001 = spawn("node", [start1ScriptPath], {
      stdio: [0, 1, 2, "ipc"],
    });
    console.log("Child process 5001 started");

    childProcess5001.on("exit", (code) => {
      console.log(`Child process 5001 exited with code ${code}`);
      childProcess5001 = null;
    });
  } else {
    console.log("Child process 5001 is already running");
  }
};

const stopChildProcess5001 = () => {
  if (childProcess5001) {
    childProcess5001.kill();
    childProcess5001 = null;
    console.log("Child process 5001 stopped");
  } else {
    console.log("Child process 5001 is not running");
  }
};

const requestListener = function (req, res) {
  console.log("req.url: ", req.url);
  if (req.url === "/start5000") {
    startChildProcess5000();
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message":"Child process 5000 started"}`);
  } else if (req.url === "/stop5000") {
    stopChildProcess5000();
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message":"Child process 5000 stopped"}`);
  } else if (req.url === "/start5001") {
    startChildProcess5001();
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message":"Child process 5001 started"}`);
  } else if (req.url === "/stop5001") {
    stopChildProcess5001();
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message":"Child process 5000 stopped"}`);
  } else {
    console.log("Returning / index.html");
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<html><body><h1>Welcome to the index page!</h1></body></html>`);
  }
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
