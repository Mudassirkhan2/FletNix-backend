import moongose from 'mongoose'
import { Schema ,model } from 'mongoose';
const USerSchema = new Schema({
   
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    age : {
        type: Number,
    },
});

const UserModel = moongose.models.user || model('user', USerSchema);

export default UserModel;