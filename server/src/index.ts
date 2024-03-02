import express, { Express } from 'express';
import router from './routes/index.route';
import { connect } from 'mongoose';
import config from './utils/config';
import errorMiddleware from './middlewares/error.middleware';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(router);

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK', success: true });
});

app.use(errorMiddleware);

const start = async () => {
    try {
        await connect(config.mongo_url!);
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

start();
