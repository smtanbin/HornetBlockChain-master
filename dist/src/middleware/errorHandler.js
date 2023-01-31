"use strict";
exports.__esModule = true;
var logEvents_1 = require("./logEvents");
var errorHandler = function (err, req, res, next) {
    (0, logEvents_1.logEvents)("".concat(err.name, ": ").concat(err.message), "errLog.txt");
    console.error(err.stack);
    res.status(500).send(err.message);
};
exports["default"] = errorHandler;
//# sourceMappingURL=errorHandler.js.map