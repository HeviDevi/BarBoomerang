const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    //Need to look into validation for email
    email: { type: String, required: true, unique: true },
    thoughts: [
      { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
        required: false, 
      }
    ],
    friends: [
      { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: false 
    }

    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = mongoose.model("User", userSchema);

User.find({})
  .exec()
  .then( async userArray => {
    if (userArray.length === 0) {
      const seedUsers = await User.insertMany(
        [
          {
            _id: "6684726426f756efce752deb",
            username: "HeviDevi",
            email: "tester-email@gmail.com",
            thoughts: [],
            friends: [
              "6684726426f756efce752dec", 
              "6684726426f756efce752ded", 
              "6684726426f756efce752dee"
            ]
          },
          {
            _id: "6684726426f756efce752dec",
            username: "Clarissa 'Boss Man' Mobley",
            email: "tester-email2@gmail.com",
            thoughts: [],
            friends: [
              "6684726426f756efce752deb",
              "6684726426f756efce752ded",
              "6684726426f756efce752dee"
            ]
          },
          {
            _id: "6684726426f756efce752ded",
            username: "Alex The Great",
            email: "tester-email3@gmail.com",
            thoughts: [],
            friends: [
              "6684726426f756efce752deb",
              "6684726426f756efce752dec",
              "6684726426f756efce752dee"
            ]
          },
          {
            _id:  "6684726426f756efce752dee",
            username: "Big Eddie",
            email: "tester-email4@gmail.com",
            thoughts: [],
            friends: [
              "6684726426f756efce752deb",
              "6684726426f756efce752dec",
              "6684726426f756efce752ded"
            ]
          },
        ]
      )
      return console.log("Seed users added", seedUsers);
    };
    return console.log("No seed users added");  
  })

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

userSchema.virtual("thoughtCount").get(function () {
    return this.thoughts.length;
});



module.exports = User;
