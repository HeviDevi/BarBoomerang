const mongoose = require("mongoose");
const  Comment  = require("./Comment");
const commentSchema = Comment.schema;

const cocktailSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    cocktailName: { 
      type: String,
      required: true,
      minLength: 1,
      maxLength: 25
    },
    instructions: { 
      type: String, 
      required: true,
      minLength: 1,
      maxLength: 300 
    },
    comments: [commentSchema],
    datePosted: { type: Date, default: Date.now },
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

cocktailSchema.virtual("commentCount").get(function () {
    return this.comments.length;
});
const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail;
