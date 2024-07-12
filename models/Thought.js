const mongoose = require("mongoose");
const Reaction  = require("./Reaction");
const User = require("./User");
const reactionSchema = Reaction.schema;

const thoughtSchema = new mongoose.Schema(
  {
    username: { 
      type: String,
      unique: true,
      ref: "User",
      required: true
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

Thought.find({})
.exec()
.then( async thoughtArray => {
  if (thoughtArray.length === 0) {
    const seedThoughts = await Thought.insertMany(
      [
        {
          userID: "6684726426f756efce752deb",
          username: "HeviDevi",
          thoughtText: "It's 5 o'clock somewhere!",
          reactions: [],
          createdAt: new Date()
        },
        {
          userID: "6684726426f756efce752dec",
          username: "Clarissa 'Boss Man' Mobley",
          thoughtText: "Rainy today isn't it?",
          reations: [],
          createdAt: new Date()
        },
        {
          userID: "6684726426f756efce752ded",
          username: "Alex The Great",
          thoughtText: "I like turtles",
          reactions: [],
          createdAt: new Date()
        },
        {
          userID: "6684726426f756efce752dee",
          username: "Big Eddie",
          thoughtText: "Hello There",
          reactions: [],
          createdAt: new Date()
        },
      ]
    )
    for  (const thought of seedThoughts) {
      await User.updateMany(
        { _id: thought.userID }, 
        { $push: { thoughts: thought._id } }
      );
    }
    return console.log("Seed thoughts added", seedThoughts)
  }
  return console.log("No seed thoughts added")
})

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});


module.exports = Thought;
