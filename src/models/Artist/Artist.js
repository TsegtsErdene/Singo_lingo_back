const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const ArtistSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    }
);

ArtistSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Artist', ArtistSchema)