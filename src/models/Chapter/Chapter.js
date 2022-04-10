const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const ChapterSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        episode: {
            type: Number,
            required: true
        },
        duration: {
            type: Number
        },
        content: {
            type: String,
            required: true
        },
        translator: {
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

ChapterSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Chapter', ChapterSchema)