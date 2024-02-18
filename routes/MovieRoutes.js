import Express from 'express';
const movie = Express();
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import { model } from 'mongoose'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { uploadMovies, getMovies } from '../controllers/movieController.js';

// __filename and __dirname are not available in ES6 modules, so we have to use the following workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

movie.use(bodyParser.urlencoded({ extended: true }));
movie.use(Express.static(path.resolve(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
})

var upload = multer({ storage: storage })

movie.post('/uploadMovies', upload.single('file'), uploadMovies);
movie.get('/movies', getMovies);


export default movie;