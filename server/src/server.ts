import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import winnersRouter from "./routes/winnersrouter";
import frquencyroutes from "./routes/Frquencyroutes";

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    };
    routes(): void {
        this.app.use('/', winnersRouter)
        this.app.use('/api/winners', winnersRouter);
    };
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`)
        });
    }
}

const server = new Server();
server.start();