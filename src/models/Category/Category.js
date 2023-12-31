const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
    }
);

CategorySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Category', CategorySchema)