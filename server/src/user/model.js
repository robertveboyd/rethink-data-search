import db from '../db.js';
const Schema = db.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
}, { 
    versionKey: false,
})

export default db.model('User', UserSchema);