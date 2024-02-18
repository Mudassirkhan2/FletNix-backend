import moongose from 'mongoose'
import { Schema ,model } from 'mongoose';
const MovieSchema = new Schema({
    type: {
        type: String,
    },

    title: {
        type: String,
    },
    director: {
        type: String,
    },
    cast: {
        type: String,
    },
    date_added: {
        type: String,
    },
    release_year: {
        type: String,
    },
    rating: {
        type: String,
    },
    duration: {
        type: String,
    },
    listed_in: {
        type: String,
    },
    description: {
        type: String,
    }
});

const MovieModel = moongose.models.Movie || model('Movie', MovieSchema);

export default MovieModel;