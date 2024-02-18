import moongoose, { connect } from 'mongoose';
import Express from 'express';
import movie from "./routes/MovieRoutes.js";
import { connectToDB } from './config/database.js';

const app = Express();
app.use('/', movie);
connectToDB();

app.listen(
    3000,
    () => {
        console.log('Server is running on port 3000');
    }
)