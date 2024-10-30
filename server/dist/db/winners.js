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
exports.getAll = getAll;
exports.getOne = getOne;
exports.getWinLot = getWinLot;
const queryUtils_1 = require("./queryUtils");
const puppeteer_1 = __importDefault(require("puppeteer"));
function getAll() {
    return (0, queryUtils_1.SelectQuery)('SELECT * FROM winners;');
}
function getOne(id) {
    const queryString = 'SELECT * FROM winners WHERE id = ?;';
    return (0, queryUtils_1.SelectQuery)(queryString, [id]);
}
//Secund version of fetch
function getWinners() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        const url = 'https://www.flalottery.com/pick3';
        yield page.goto(url);
        const winnerData = yield page.evaluate(() => {
            const dateFormatter = (fecha) => {
                const [day, month, year] = fecha.split('/');
                console.log(`fecha ${fecha} el dia es ${day} el mes ${month} año ${year}`);
                return (day.length == 1 ? '0' + day : day) + '/' + (month.length == 1 ? '0' + month : month) + '/' + (year.length == 2 ? '20' + year : year);
            };
            const winners = Array.from(document.querySelectorAll('div.draw-game-header__card'));
            return winners.map((win) => {
                const [d1, d2, d3, d4, d5, d6] = win.querySelectorAll('div ul li.game-numbers__number > span');
                const dgs = win.querySelectorAll('div ul li.game-numbers__number > span');
                const fb = win.querySelectorAll('div ul li.game-numbers__bonus span.game-numbers__bonus-text');
                const toText = (element) => element && element.innerText.trim();
                const date = win.querySelectorAll('.draw-date');
                return {
                    id: 1,
                    schedule_id: 2,
                    d1: toText(d1),
                    d2: toText(d2),
                    d3: toText(d3),
                    dd1: toText(d4),
                    dd2: toText(d5),
                    dd3: toText(d6),
                    fb1: toText(fb[0]),
                    fb2: toText(fb[1]),
                    drawdate: dateFormatter(new Date(toText(date[0])).toLocaleDateString('en-US')),
                    drawdate1: dateFormatter(new Date(toText(date[1])).toLocaleDateString('en-US')),
                    created_at: dateFormatter(new Date().toLocaleDateString()),
                };
            });
        });
        console.log(winnerData);
        yield browser.close();
        return winnerData;
    });
}
function getWinLot() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getWinners().then((results) => {
            const result = results; // db.winners.getWinLot()
            const result1 = result.map((win, index) => {
                return {
                    id: 1,
                    schedule_id: 1,
                    drawdate: win.drawdate,
                    d1: win.d1,
                    d2: win.d2,
                    d3: win.d3,
                    fireball: win.fb1,
                    trio: win.d1 + win.d2 + win.d3,
                    f23: win.d2 + win.d3,
                    f12: win.d1 + win.d2,
                    f13: win.d1 + win.d3,
                    created_at: win.created_at,
                };
            });
            const result2 = result.map((win, index) => {
                return {
                    id: 2,
                    schedule_id: 2,
                    drawdate: win.drawdate1,
                    d1: win.dd1,
                    d2: win.dd2,
                    d3: win.dd3,
                    fireball: win.fb2,
                    trio: win.dd1 + win.dd2 + win.dd3,
                    f23: win.dd2 + win.dd3,
                    f12: win.dd1 + win.dd2,
                    f13: win.dd1 + win.dd3,
                    created_at: win.created_at,
                };
            });
            result1.push(...result2);
            console.log(result1);
            return result1;
        });
    });
}
// export async function getWinLot() {
//     return await getWinners<IWinners>().then((results) => {
//         let result = results // db.winners.getWinLot()
//         const result1 = result.map((win: any, index: number) => {
//             return {
//                 id: 1,
//                 schedule_id: 1,
//                 drawdate: win.drawdate,
//                 d1: win.d1,
//                 d2: win.d2,
//                 d3: win.d3,
//                 fireball: win.fb1,
//                 trio: win.d1 + win.d2 + win.d3,
//                 f23: win.d2 + win.d3,
//                 f12: win.d1 + win.d2,
//                 f13: win.d1 + win.d3,
//                 created_at: win.created_at,
//             }
//         });
//         const result2 = result.map((win: any, index: number) => {
//             return {
//                 id: 2,
//                 schedule_id: 2,
//                 drawdate: win.drawdate1,
//                 d1: win.dd1,
//                 d2: win.dd2,
//                 d3: win.dd3,
//                 fireball: win.fb2,
//                 trio: win.dd1 + win.dd2 + win.dd3,
//                 f23: win.dd2 + win.dd3,
//                 f12: win.dd1 + win.dd2,
//                 f13: win.dd1 + win.dd3,
//                 created_at: win.created_at,
//             }
//         });
//         result1.push(...result2);
//         console.log(result1);
//         return result1
//     });
// }
//Fetch data from internet
// async function getWinners<T>(): Promise<Partial<T>[]> {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const url = 'https://www.flalottery.com/pick3';
//     await page.goto(url);
//     const winnerData = await page.evaluate(() => {
//         const dateFormatter = (fecha: string) => {
//             const [day, month, year] = fecha.split('/'); console.log(`fecha ${fecha} el dia es ${day} el mes ${month} año ${year}`);
//             return (day.length == 1 ? '0' + day : day) + '/' + (month.length == 1 ? '0' + month : month) + '/' + (year.length == 2 ? '20' + year : year)
//         }
//         const winners = Array.from(document.querySelectorAll('div.draw-game-header__card'));
//         return winners.map((win) => {
//             const [d1, d2, d3, d4, d5, d6] = win.querySelectorAll('div ul li.game-numbers__number > span');
//             const dgs = win.querySelectorAll('div ul li.game-numbers__number > span');
//             const fb = win.querySelectorAll('div ul li.game-numbers__bonus span.game-numbers__bonus-text');
//             const toText = (element: any) => element && element.innerText.trim();
//             const date = win.querySelectorAll('.draw-date');
//             return {
//                 id: 1,
//                 schedule_id: 2,
//                 d1: toText(d1),
//                 d2: toText(d2),
//                 d3: toText(d3),
//                 dd1: toText(d4),
//                 dd2: toText(d5),
//                 dd3: toText(d6),
//                 fb1: toText(fb[0]),
//                 fb2: toText(fb[1]),
//                 drawdate: dateFormatter(new Date(toText(date[0])).toLocaleDateString('en-US')),
//                 drawdate1: dateFormatter(new Date(toText(date[1])).toLocaleDateString('en-US')),
//                 created_at: dateFormatter(new Date().toLocaleDateString()),
//             }
//         });
//     });
//     console.log(winnerData)
//     await browser.close()
//     return winnerData as T[];
// }
// export async function getWinLot() {
//     return await getWinners<IWinners>().then((results) => {
//         let result = results // db.winners.getWinLot()
//         const result1 = result.map((win: any, index: number) => {
//             return {
//                 id: 1,
//                 schedule_id: 1,
//                 drawdate: win.drawdate,
//                 d1: win.d1,
//                 d2: win.d2,
//                 d3: win.d3,
//                 fireball: win.fb1,
//                 trio: win.d1 + win.d2 + win.d3,
//                 f23: win.d2 + win.d3,
//                 f12: win.d1 + win.d2,
//                 f13: win.d1 + win.d3,
//                 created_at: win.created_at,
//             }
//         });
//         const result2 = result.map((win: any, index: number) => {
//             return {
//                 id: 2,
//                 schedule_id: 2,
//                 drawdate: win.drawdate1,
//                 d1: win.dd1,
//                 d2: win.dd2,
//                 d3: win.dd3,
//                 fireball: win.fb2,
//                 trio: win.dd1 + win.dd2 + win.dd3,
//                 f23: win.dd2 + win.dd3,
//                 f12: win.dd1 + win.dd2,
//                 f13: win.dd1 + win.dd3,
//                 created_at: win.created_at,
//             }
//         });
//         result1.push(...result2);
//         return result1
//     });
// }
