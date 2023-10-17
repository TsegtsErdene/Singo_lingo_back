const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const ReelsSchema = new Schema(
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
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            require: true
        },
        like: {
            type: Number,
            required: true
        },
        view: {
            type: Number,
            require: true
        }
    }
);

ReelsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Reels', ReelsSchema)