const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CurrentDataSchema = new Schema(
    {
        bgColor: {
            type: String,
            default: "white",
            required: true
        },
        readChapter: {
            type: Schema.Types.ObjectId,
            ref: 'Chapter'
        }
    }
);

module.exports = mongoose.model('CurrentData', CurrentDataSchema)