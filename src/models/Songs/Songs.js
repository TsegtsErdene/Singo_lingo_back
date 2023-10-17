const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const SongsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        profile: {
            type: Buffer,
            required: true
        },
        artists: {
            type: Schema.Types.ObjectId,
            ref: 'Artist'
        },
        lyrics: {
            type: String,
            required: true
        },
        audio: {
            type: Buffer,
            required: true
        },
        categories: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    }
);

SongsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Songs', SongsSchema)