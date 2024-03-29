
import csv from 'csvtojson';
import MovieModel from '../models/MovieModel.js';
import { connectToDB } from '../config/database.js';
import UserModel from '../models/userModel.js';
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
        const userId = req.params.userId; 
        connectToDB();
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const userAge = user.age;
        let movies;
        if (userAge < 18) {
            movies = await MovieModel.aggregate([
                {
                    $match: {
                        rating: { $ne: "R" }, // Exclude movies with rating "R"
                        date_added: { $ne: "" } // Filter out empty date_added fields
                    }
                },
                {
                    $addFields: {
                        parsedDate: { $dateFromString: { dateString: "$date_added" } }
                    }
                },
                {
                    $sort: { parsedDate: -1 } // Sort by date_added in descending order
                }
            ]);
        } else {
            // sort by date_added which is of  format of septmber 14 , 2021
            movies = await MovieModel.aggregate([
                {
                  $match: {
                    date_added: { $ne: "" } 
                  }
                },
                {
                  $addFields: {
                    parsedDate: { $dateFromString: { dateString: "$date_added" } }
                  }
                },
                {
                  $sort: { parsedDate: -1 }
                }
              ]);

        }
        res.send(movies);
    } catch (error) {
        console.error('Error while fetching movies for user:', error);
        res.status(500).send({ message: "Failed to fetch movies" });
    }
}

const getMoviesByTitle = async (req, res) => {
    try {
        connectToDB();
        const title = req.params.title; 
        const movies = await MovieModel.find({ title: { $regex: title, $options: 'i' } });
        res.send(movies);
    } catch (error) {
        res.send({ message: "Failed to fetch movies by title" });
    }
}

export { uploadMovies, getMovies, getMoviesByTitle };









