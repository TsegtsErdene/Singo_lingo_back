const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['translator', 'reader', 'admin'],
            default: 'reader',
            required: true
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
);

UserSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', UserSchema)