const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const NovelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  total_chapter: {
    type: Number,
    default: 0,
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
    type: Number,
    required: true,
    default: 0
  },
  cover_url: {
    type: String,
    required: true
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
  total_views: {
    type: Number,
    default: 0,
    required: true
  },
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
