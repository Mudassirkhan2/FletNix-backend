import { connectToDB } from '../config/database.js';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        connectToDB();
        const user = await UserModel.create(req.body);
        res.send(
            {
                message: "User created successfully",
                user: user
            }
        );
    } catch (error) {
        res.send({ message: "Failed to create user" });
    }
}

// login
const loginUser = async (req, res) => {
    connectToDB();
    try {
        const user = await UserModel.findOne({ email: req.body.email,
            password: req.body.password
        });
        if (user) {
            const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
            res.send({
                message: "Login successful",
                user: user,
                token: token
            });
        } else {
            res.send({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error('Error while logging in:', error);
        res.send({ message: "Failed to login" });
    }
};


export { createUser ,loginUser};