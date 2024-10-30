import { Router } from "express";
import winnerController from '../controllers/winnercontroller';

class WinnersRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/getWinners', winnerController.getWinners);
        this.router.get('/getAll', winnerController.getAll)
        this.router.get('/:id', winnerController.getOne)
    }
}
const winnersRouter = new WinnersRouter();
export default winnersRouter.router;
