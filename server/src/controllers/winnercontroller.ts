import { Response, Request } from 'express';
import db from '../db';
// deno-lint-ignore-file

export class WinnerController {
  public async getWinners({ req, res }: { req: Request, res: Response }) {
    try {
      let result = await db.winners.getWinLot()
      // result1.push(...result2)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error!!!" })
    }
  }
  public async getAll({ req, res }: { req: Request, res: Response }) {
    try {
      const result = await db.winners.getAll();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error!!!" })
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const winId = parseInt(req.params.id, 10);

      const result = await db.winners.getOne(winId);
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error!!!" })
    }

  }

  public async add({ req, res }: { req: Request, res: Response }) {
    try {
      const result = await db.winners.getAll();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error!!!" })
    }
  }
}
const winnerController = new WinnerController();
export default winnerController;

