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
<<<<<<< HEAD
        title: {
            type: String,
            required: true
        },
        total_chapter: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        started_year: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }],
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);
=======
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
>>>>>>> 1be39bf0ece5e2038b1b9357c5b560333ff88646

NovelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Novel", NovelSchema);
