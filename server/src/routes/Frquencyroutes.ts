import { Router } from "express";
import winnerController from '../controllers/winnercontroller';

class FrquencyRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        // this.router.get('/', (req, res) => res.send('Estamos en Frquencia!!!'));
        this.router.get('/', winnerController.getAll)
        // this.router.get('/:id', winnerController.getOne)
    }
}
const frquencyRouter = new FrquencyRouter();
export default frquencyRouter.router;
