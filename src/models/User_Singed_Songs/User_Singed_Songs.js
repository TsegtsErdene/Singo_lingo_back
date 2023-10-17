const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const User_Signed_SongsSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        song_id: {
            type: Schema.Types.ObjectId,
            ref: 'Song',
            required: true
        },
        record: {
            type: Buffer,
            require: true
        },
        check: {
            type: Object,
            required: true
        },
        video: {
            type: Buffer,
            require: true
        }
    }
);

User_Signed_SongsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User_Signed_Songs', User_Signed_SongsSchema)