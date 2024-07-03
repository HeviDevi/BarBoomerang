const router = require("express").Router();
const User  = require("../../models/User");
const Cocktail = require ("../../models/Cocktail");
const Comment = require ("../../models/Comment");


//CRUD operations for username

// Create a new user
router.post("/", (req, res) => {

  // Ensure the request body looks like this
  //   {      
  //   "username": "username",
  //   "email": "email",
  //    }, 

  User.create(req.body)
    .then(result => {
      res.json(result);
    });
});

// Add a friend to a user
router.post("/:userID/friends/:friendID", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userID,
    { $push: { friends: req.params.friendID } },
    { new: true }
  )
  .then(data => {
    res.json(data)
  })
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
  Comment.deleteMany({userID: req.params.id})
  .exec()
  .then(data => {
    console.log("Users comments deleted sucsessfully")})
    .catch(err => {
      console.log(err, "Error deleting users comments")
    })
    Cocktail.deleteMany({userID: req.params.id})
    .exec()
    .then(data => {
      console.log("Users cocktails deleted sucsessfully")})
      .catch(err => {
        console.log(err, "Error deleting users cocktails")
      })
      User.findByIdAndDelete({_id: req.params.id})
      .exec()
      .then(data => {
        res.send({message: "User's Comments, Cocktails and profile have been deleted"})
      })
  })

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
