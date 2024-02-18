
import csv from 'csvtojson';
import MovieModel from '../models/MovieModel.js';
import { connectToDB } from '../config/database.js';
const uploadMovies = async (req, res) => {
    try {
        connectToDB();
        var MovieData = [];
        csv()
            .fromFile(req.file.path)
            .then  ( async(jsonObj) => {

                for(let i = 0; i < jsonObj.length; i++){
                    MovieData.push({
                        type : jsonObj[i].type,
                        title : jsonObj[i].title,
                        director : jsonObj[i].director,
                        cast : jsonObj[i].cast, 
                        date_added : jsonObj[i].date_added,
                        release_year : jsonObj[i].release_year,
                        rating: jsonObj[i].rating,
                        duration: jsonObj[i].duration,
                        listed_in: jsonObj[i].listed_in,
                        description: jsonObj[i].description
                    });
                }
                console.log("MovieData", MovieData[0]);
                await MovieModel.insertMany(MovieData);
            });
          res.send({ message: "File uploaded successfully" });
    } catch (error) {
        res.send({ message: "File uploaded failed" });
    }
}

const getMovies = async (req, res) => {
    try {
        connectToDB();
        const movies = await MovieModel.find({});
        res.send(movies);
    } catch (error) {
        res.send({ message: "File uploaded failed" });
    }
}

export { uploadMovies, getMovies };







