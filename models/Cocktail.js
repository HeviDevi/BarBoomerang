const mongoose = require("mongoose");
const Comment  = require("./Comment");
const User = require("./User");
const commentSchema = Comment.schema;

const cocktailSchema = new mongoose.Schema(
  {
    userID: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true

      },
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

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

Cocktail.find({})
.exec()
.then( async cocktailArray => {
  if (cocktailArray.length === 0) {
    const seedCocktails = await Cocktail.insertMany(
      [
        {
          userID: "6684726426f756efce752deb",
          cocktailName: "Margarita",
          instructions: "Shake ingredients with ice, strain into a glass, and serve.",
          comments: [],
          datePosted: new Date()
        },
        {
          userID: "6684726426f756efce752dec",
          cocktailName: "Martini",
          instructions: "Stir ingredients with ice, strain into a glass, and serve.",
          comments: [],
          datePosted: new Date()
        },
        {
          userID: "6684726426f756efce752ded",
          cocktailName: "Old Fashioned",
          instructions: "Muddle sugar and bitters, add ice and whiskey, stir, and serve.",
          comments: [],
          datePosted: new Date()
        },
        {
          userID: "6684726426f756efce752dee",
          cocktailName: "Mojito",
          instructions: "Muddle mint and sugar, add ice and rum, stir, and serve.",
          comments: [],
          datePosted: new Date()
        },
      ]
    )
    for (const cocktail of seedCocktails) {
      await User.updateOne(
        { _id: cocktail.userID }, 
        { $push: { cocktails: cocktail._id } }
      );
    }
    return console.log("Seed cocktails added", seedCocktails)
  }
  return console.log("No seed cocktails added")
})

cocktailSchema.virtual("commentCount").get(function () {
    return this.comments.length;
});


module.exports = Cocktail;
