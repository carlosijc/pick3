"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const winnercontroller_1 = __importDefault(require("../controllers/winnercontroller"));
class WinnersRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getWinners', winnercontroller_1.default.getWinners);
        this.router.get('/getAll', winnercontroller_1.default.getAll);
        this.router.get('/:id', winnercontroller_1.default.getOne);
    }
}
const winnersRouter = new WinnersRouter();
exports.default = winnersRouter.router;
