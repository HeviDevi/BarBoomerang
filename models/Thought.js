const mongoose = require("mongoose");
const Reaction  = require("./Reaction");
const User = require("./User");
const reactionSchema = Reaction.schema;

const thoughtSchema = new mongoose.Schema(
  {
    userId: { 
      type: String,
      required: true,
      unique: false,
      },
    username: {
      type: String,
      required: false,
      unique: false,
    },
    thoughtText: { 
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    reactions: [reactionSchema],
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Thought = mongoose.model("Thoughts", thoughtSchema);

// // Seed thoughts to be implemented, 
//Couldn't get the thoughts pushed in the user's thoughts array ;( sad face

Thought.find({})
.exec()
.then( async thoughtArray => {
  if (thoughtArray.length === 0) {
    const seedThoughts = await Thought.insertMany(
      [
        {
          userId: "6684726426f756efce752deb",
          thoughtText: "It's 5 o'clock somewhere!",
          reactions: [],
          createdAt: new Date()
        },
        {
          userId: "6684726426f756efce752dec",
          thoughtText: "Rainy today isn't it? Perfect for a Martini.",
          reactions: [],
          createdAt: new Date()
        },
        {
          userId: "6684726426f756efce752ded",
          thoughtText: "I like turtles. And Old Fashioneds.",
          reactions: [],
          createdAt: new Date()
        },
        {
          userId: "6684726426f756efce752dee",
          thoughtText: "Hello There, Mojito Time.",
          reactions: [],
          createdAt: new Date()
        },
      ]
    )
    for (const thought of seedThoughts) {
      await User.updateOne(
        { _id: thought.userId }, // Match users by their userId
        { $push: { thoughts: thought._id } } // Push the thought's _id into the user's thoughts array
      );
    }
    return console.log("Seed thoughts added", seedThoughts);
  }
  return console.log("No seed thoughts added");
});

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});


module.exports = Thought;
