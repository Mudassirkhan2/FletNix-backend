import Express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';
const user = Express();

user.post('/signup', createUser);
user.post('/login', loginUser);

export default user;
