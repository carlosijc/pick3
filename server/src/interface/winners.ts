import { RowDataPacket } from "mysql2";

interface IWinners extends RowDataPacket {
    id: number,
    schedule_id: number,
    drawdate: string,
    d1: string,
    d2: string,
    d3: string,
    trio: string,
    f23: string,
    f12: string,
    f13: string,
    fireball: string,
    created_at: string, //new Date(req.body.created_at),
};
// interface IWinners {
//     id: number,
//     schedule_id: number,
//     drawdate: Date,
//     d1: number,
//     d2: number,
//     d3: number,
//     trio: number,
//     f23: number,
//     f12: number,
//     f13: number,
//     fireball: number,
//     created_at: Date, //new Date(req.body.created_at),
// };
export default IWinners