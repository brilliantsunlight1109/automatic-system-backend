// const http = require("http");
// const { spawn } = require("child_process");
// const path = require("path");
// let childProcess5000;
// let childProcess5001;
// const PORT = 4001;

// const startChildProcess5000 = () => {
//   if (!childProcess5000) {
//     const startScriptPath = path.join(__dirname, "../../index.js");
//     childProcess5000 = spawn("node", [startScriptPath], {
//       stdio: [0, 1, 2, "ipc"],
//     });
//     console.log("Child process 5000 started");

//     childProcess5000.on("exit", (code) => {
//       console.log(`Child process 5000 exited with code ${code}`);
//       childProcess5000 = null;
//     });
//   } else {
//     console.log("Child process 5000 is already running");
//   }
// };

// const stopChildProcess5000 = () => {
//   if (childProcess5000) {
//     childProcess5000.kill();
//     childProcess5000 = null;
//     console.log("Child process 5000 stopped");
//   } else {
//     console.log("Child process 5000 is not running");
//   }
// };

// const startChildProcess5001 = () => {
//   if (!childProcess5001) {
//     const start1ScriptPath = path.join(__dirname, "../../main.js");
//     childProcess5001 = spawn("node", [start1ScriptPath], {
//       stdio: [0, 1, 2, "ipc"],
//     });
//     console.log("Child process 5001 started");

//     childProcess5001.on("exit", (code) => {
//       console.log(`Child process 5001 exited with code ${code}`);
//       childProcess5001 = null;
//     });
//   } else {
//     console.log("Child process 5001 is already running");
//   }
// };

// const stopChildProcess5001 = () => {
//   if (childProcess5001) {
//     childProcess5001.kill();
//     childProcess5001 = null;
//     console.log("Child process 5001 stopped");
//   } else {
//     console.log("Child process 5001 is not running");
//   }
// };

// const requestListener = function (req, res) {
//   console.log("req.url: ", req.url);
//   if (req.url === "/start5000") {
//     startChildProcess5001();
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(`{"message":"Child process 5000 started"}`);
//   } else if (req.url === "/stop5000") {
//     stopChildProcess5000();
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(`{"message":"Child process 5000 stopped"}`);
//   } else if (req.url === "/start5001") {
//     startChildProcess5001();
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(`{"message":"Child process 5001 started"}`);
//   } else if (req.url === "/stop5001") {
//     stopChildProcess5001();
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(`{"message":"Child process 5000 stopped"}`);
//   } else {
//     console.log("Returning / index.html");
//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200);
//     res.end(`<html><body><h1>Welcome to the index page!</h1></body></html>`);
//   }
// };

// const server = http.createServer(requestListener);

// module.exports.postControl = (req, res) => {
//   console.log("req.url: ", req.url);
//   if (req.method === "POST" && req.url === "/start5000") {
//     startChildProcess5000();
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(JSON.stringify({ message: "Child process 5000 started" }));
//   } else {
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(404);
//     res.end(JSON.stringify({ error: "Endpoint not found" }));
//   }
// };
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
