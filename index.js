import moongoose, { connect } from 'mongoose';
import Express from 'express';
import movie from "./routes/MovieRoutes.js";
import user from './routes/UserRoutes.js';
import { connectToDB } from './config/database.js';
import cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(cors());
app.use('/', movie);
app.use('/user',user);

connectToDB();


app.listen(
    3000,
    () => {
        console.log('Server is running on port 3000');
    }
)