"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
// import * as jwt from "jsonwebtoken"
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
// Logging configuration
var morgan_1 = __importDefault(require("morgan"));
var logEvents_1 = require("./src/middleware/logEvents");
var errorHandler_1 = __importDefault(require("./src/middleware/errorHandler"));
// Apps
var child_process_1 = require("child_process");
//Route configuration
var authRouter = require("./src/routes/auths_routes");
var vartixRouter = require("./src/routes/vartix_routes");
var blockChainRouter = require("./src/routes/blockchain_routes");
var walletRouter = require("./src/routes/wallet_routes");
require("dotenv").config();
// const secret = "mysecret" // A secret key for signing the JWT
// const refreshSecret = "myrefreshsecret"
// Optations
var corsOptions = {
    origin: "*"
};
// Add on
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])(corsOptions));
if (process.env.NODE_ENV === "production") {
    console.log("Running in production mode");
}
else {
    app.use((0, morgan_1["default"])("dev"));
    app.use(logEvents_1.log);
    console.log("Running in development mode");
}
// middleware
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, cookie_parser_1["default"])());
// Routes
app.get("/status", function (req, res) {
    res.send({ Massage: "I am alive." });
});
app.use("/", authRouter);
app.use("/blockchain", blockChainRouter);
app.use("/vartix", vartixRouter);
app.use("/wallet", walletRouter);
// Express Install
app.post("/listFiles", function (req, res) {
    var child = (0, child_process_1.spawn)("find", ["."]);
    child.stdout.on("data", function (data) {
        res.send(data);
    });
    child.on("error", function (error) {
        console.error("error: ".concat(error.message));
        res.status(405).json("Error: ".concat(error.message));
    });
    child.on("close", function (code) {
        console.log("child process exited with code ".concat(code));
    });
});
app.post("/migrate", function (req, res) {
    var script = "migrate";
    var child = (0, child_process_1.spawn)("bash", ["npm", "run", script]);
    child.stdout.on("data", function (data) {
        res.send("output: ".concat(data));
    });
    child.on("close", function (code) {
        res.send("child process exited with code ".concat(code));
    });
});
app.post("/sync", function (req, res) {
    var script = "sync";
    var child = (0, child_process_1.spawn)("bash", ["npm", "run", script]);
    child.stdout.on("data", function (data) {
        res.send("output: ".concat(data));
    });
    child.on("close", function (code) {
        res.send("child process exited with code ".concat(code));
    });
});
// Error handlers
app.use(errorHandler_1["default"]);
// app.use((err: any, req: any, res: any, next: () => void) => {
//   console.error(err.stack)
//   res.status(500).send("Something broke!")
//   next()
// })
// Undefined error
app.use("/*", function (req, res, next) {
    res.status(404).json({ Error: "Invalid Address" });
    next();
});
exports["default"] = app;
//# sourceMappingURL=main.js.map