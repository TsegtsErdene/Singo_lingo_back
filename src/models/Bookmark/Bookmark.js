const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const BookmarkSchema = new Schema(
    {
        User: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        novel: {
            type: Schema.Types.ObjectId,
            ref: 'Novel'
        }
    }
);

BookmarkSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Bookmark', BookmarkSchema)