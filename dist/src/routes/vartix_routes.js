"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var Vartix_1 = __importDefault(require("../Apps/Vartix"));
var moment_1 = __importDefault(require("moment"));
var vartix = new Vartix_1["default"]();
// import { dataGen } from "../Apps/FakeData"
router.post("/load", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletid, amount, body, from, output, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletid = _a.walletid, amount = _a.amount, body = _a.body;
                body = JSON.stringify(body);
                from = "0000000000000000";
                console.log(req);
                return [4 /*yield*/, vartix.make(from, walletid, amount, body)];
            case 1:
                output = _b.sent();
                res.send("Massage:" + output);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.log("Ërror://", err_1);
                res.send(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, from, to, amount, body, output, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log(req.body);
                _a = req.body, from = _a.from, to = _a.to, amount = _a.amount, body = _a.body;
                body = JSON.stringify(body);
                return [4 /*yield*/, vartix.make(from, to, amount, body)];
            case 1:
                output = _b.sent();
                res.send(output);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.log("Ërror://", err_2);
                res.send(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/look", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var walletid, output, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                walletid = req.body.walletid;
                return [4 /*yield*/, vartix.look(walletid)];
            case 1:
                output = _a.sent();
                res.send(output);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log("Ërror://", err_3);
                res.send(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/balance", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vartix.balance(req.body.walletid)];
            case 1:
                output = _a.sent();
                res.send({ Balance: output });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log("Ërror://", err_4);
                res.send(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/statment_period", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, from, to, walletid, fromDate, toDate, output, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, from = _a.from, to = _a.to, walletid = _a.walletid;
                console.log(req.body);
                fromDate = (0, moment_1["default"])(from).format("DD-MM-YYYY").toString();
                toDate = (0, moment_1["default"])(to).format("DD-MM-YYYY").toString();
                console.log(fromDate, toDate);
                return [4 /*yield*/, vartix.statment_period(walletid, fromDate, toDate)];
            case 1:
                output = _b.sent();
                console.log(output);
                res.send({ data: output });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                console.log("Ërror://statment_period/", err_5);
                res.send(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/statment", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vartix.statment(req.body.walletid)];
            case 1:
                output = _a.sent();
                res.send({ data: output });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                console.log("Ërror://statment/ ", err_6);
                res.send(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=vartix_routes.js.map