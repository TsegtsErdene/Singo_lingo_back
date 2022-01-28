const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const ReadingChapterSchema = new Schema(
    {
        chapter: {
            type: Schema.Types.ObjectId,
            ref: 'Chapter'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reading: {
            type: Boolean,
            required: true,
            default: true
        },
        progress: {
            type: Number,
            required: true,
            default: 0
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
);

ReadingChapterSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('ReadingChapter', ReadingChapterSchema)