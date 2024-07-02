const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    //Need to look into validation for email
    email: { type: String, required: true, unique: true },
    cocktails: [
      { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cocktail",
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
            username: "HeviDevi",
            email: "tester-email@gmail.com",
            cocktails: [],
            friends: []
          },
          {
            username: "Clarissa 'Boss Man' Mobley",
            email: "tester-email2@gmail.com",
            cocktails: [],
            friends: []
          },
          {
            username: "Alex The Great",
            email: "tester-email3@gmail.com",
            cocktails: [],
            friends: []
          },
          {
            username: "Big Eddie",
            email: "tester-email4@gmail.com",
            cocktails: [],
            friends: []
          },
        ]
      )
      return console.log("Seed Users added", seedUsers);
    };
    return console.log("No seed users added");  
  })

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

userSchema.virtual("cocktailCount").get(function () {
    return this.cocktails.length;
});



module.exports = User;
