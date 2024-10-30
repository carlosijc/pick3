"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const winnercontroller_1 = __importDefault(require("../controllers/winnercontroller"));
class FrquencyRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.get('/', (req, res) => res.send('Estamos en Frquencia!!!'));
        this.router.get('/', winnercontroller_1.default.getAll);
        // this.router.get('/:id', winnerController.getOne)
    }
}
const frquencyRouter = new FrquencyRouter();
exports.default = frquencyRouter.router;
