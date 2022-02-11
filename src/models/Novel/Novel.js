const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const NovelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  total_chapter: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  started_year: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

NovelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Novel", NovelSchema);
