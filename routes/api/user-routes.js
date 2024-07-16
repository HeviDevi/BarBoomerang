const router = require("express").Router();
const User  = require("../../models/User");
const Thought = require ("../../models/Thought");
const Reaction = require ("../../models/Reaction");


//CRUD operations for Users

// Create a new user
router.post("/", (req, res) => {

  // Ensure the request body looks like this
  //   {      
  //   "username": "intended username",
  //   "email": "intended email",
  //    }, 

  User.create(req.body)
    .then(result => {
      res.json(result);
    });
});


//Get all users
router.get("/", (req, res) => {
  User.find({})
    .exec()
    .then(userArray => {
      res.json(userArray);
    }
  );
});

//Get a single user
router.get("/:id", (req, res) => {
  User.findOne({_id: req.params.id})
  .exec()
  .then(result => {
    res.json(result);
  });
})

// Update a user's username or email by id
router.put("/:id", (req, res) => {

  // Ensure the request body looks like this
  // Only include the fields you want to update
  //   {      
  //   "username": "username",
  //   "email": "email",
  //    }, 
  User.updateOne({_id: req.params.id}, {$set: req.body})
  .exec()
  .then(data => {
    res.json(data)
  })
});

// Delete a user
router.delete("/:id", (req, res) => {
    // Delete all reactions by user
    Thought.updateMany({reactions: {userId: req.params.id}}, 
    {$pull: {reactions: {userId: req.params.id}}})
    .exec()
    .then(data => {
      console.log("User's reactions deleted sucsessfully")})
      .catch(err => {
        console.log(err, "Error deleting users reactions")
    })
    // Delete all thoughts by user
    Thought.deleteMany({userId: req.params.id})
    .exec()
    .then(data => {
      console.log("User's thoughts deleted sucsessfully")})
      .catch(err => {
        console.log(err, "Error deleting users thoughts")
      })
      // Delete user
      User.findByIdAndDelete({_id: req.params.id})
      .exec()
      .then(data => {
        res.send({message: "User's thoughts and profile have been deleted"})
      })
  })


// CRUD routes for friends

// Add a friend to a user
router.put("/:userID/friends/:friendID", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userID,
    { $push: { friends: req.params.friendID } },
    { new: true }
  )
  .then(data => {
    res.json(data)
  })
});

// REMOVE A FRIEND from a user by ID
router.delete("/:userID/friends/:friendID", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userID,
    { $pull: { friends: req.params.friendID } },
    { new: true }
  )
  .then(data => {
    res.send({message: "Friend removed"})
  })
  });



module.exports = router;
