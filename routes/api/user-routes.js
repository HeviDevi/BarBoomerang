const router = require("express").Router();
const User  = require("../../models/User");


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

router.get("/", (req, res) => {
  User.find({})
    .exec()
    .then(userArray => {
      res.json(userArray);
    }
  );
});

router.get("/:id", (req, res) => {
  User.findOne({_id: req.params.id})
  .exec()
  .then(result => {
    res.json(result);
  });
})

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

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete({_id: req.params.id})
  .then(data => {
    res.send({message: "User deleted"})
  })
});

module.exports = router;
