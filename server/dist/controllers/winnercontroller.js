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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnerController = void 0;
const db_1 = __importDefault(require("../db"));
// deno-lint-ignore-file
class WinnerController {
    getWinners(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req, res }) {
            try {
                let result = yield db_1.default.winners.getWinLot();
                // result1.push(...result2)
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error!!!" });
            }
        });
    }
    getAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req, res }) {
            try {
                const result = yield db_1.default.winners.getAll();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error!!!" });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const winId = parseInt(req.params.id, 10);
                const result = yield db_1.default.winners.getOne(winId);
                console.log(result);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error!!!" });
            }
        });
    }
    add(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req, res }) {
            try {
                const result = yield db_1.default.winners.getAll();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error!!!" });
            }
        });
    }
}
exports.WinnerController = WinnerController;
const winnerController = new WinnerController();
exports.default = winnerController;
