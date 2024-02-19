import moongoose, { connect } from 'mongoose';
import Express from 'express';
import movie from "./routes/MovieRoutes.js";
import { connectToDB } from './config/database.js';
import cors from 'cors';

const app = Express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/', movie);
connectToDB();


app.listen(
    3000,
    () => {
        console.log('Server is running on port 3000');
    }
)