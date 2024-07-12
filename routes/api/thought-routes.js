const router = require("express").Router();
const Thought = require("../../models/Thought");
const User = require("../../models/User");

//CRUD operations for thoughts

router.post("/:id", (req, res) => {
  // Ensure the request body looks like this
  //   {
  //     "thoughtText": "intended thought",
  //   },
  // Also include the user ID in the URL as a parameter of the request

  // We create a new thought by combining the request body with the user ID and then passing that new object to the create function
  const newThoughtData = {
    ...req.body,
    username: req.params.id,
  };

  Thought.create(newThoughtData)

    //Then the user that added the thought will have the thought ID added to their cocktail array
    .then((data) => {
      return User.updateOne(
        { _id: data.username },
        { $push: { thoughts: data._id } }
      );
    })
    .then((data) => {
      res.json(data);
    });
});

//Get all thoughts using the find method with no parameters
router.get("/", (req, res) => {
  Thought.find({})
    .exec()
    .then((data) => {
      res.json(data);
    });
});

//Get a single thought with the _id field as a parameter
router.get("/:id", (req, res) => {
  Thought.findOne({ _id: req.params.id }).then((data) => {
    res.json(data);
  });
});

// Update a thought by ID using the findOneAndUpdate method, we do not need to update the user's cocktail array, as the cocktail ID will not be altered.
router.put("/:id", (req, res) => {
  Thought.findOneAndUpdate({ _id: req.params.id }, req.body).then((data) => {
    res.send({
      message: "Thought Updated",
    });
  });
});

// Delete a thought by ID using the findOneAndDelete method
// It is important to remove the thought from the User's cocktail array first. So we are certain we will be left with "orphaned" data.
router.delete("/:id", (req, res) => {
  User.updateOne(
    { thoughts: req.params.id },
    { $pull: { thoughts: req.params.id } }
  )
    .exec()
    .then((data) => {
      console.log("Thought removed from user's thought array");
    })
    .catch((err) => {
      console.log(err, "Error removing thought from user's thought array");
    });
  Thought.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.send( "Thought has been deleted" ),
        console.log("Thought deleted");
    })
    .catch((err) => {
      console.log(err, "Error deleting thought");
    });
});


//CRUD routes for REACTIONS

router.post("/:ThoughtId/reactions/:userId", async (req, res) => {
  // Ensure the request body looks like this & include the user ID in the URL as a parameter of the request
  //   {
  //     "reactionText": "intended reaction",
  //   },

  // We find the thought by ID and then push the new reaction to the reactions array
  req.body.userId = req.params.userId,
  Thought.findOneAndUpdate({ _id: req.params.ThoughtId },
    { $push: { reactions: req.body } },
    { new: true }
  )
    .exec()
    .then((result) => {
      res.json(result);
    });
});

// Delete a reaction by ID using the findOneAndUpdate method
router.delete("/:ThoughtId/reactions/:reactionId", (req, res) => {
  // We find the thought by ID and then pull the reaction from the reactions array
  Thought.findOneAndUpdate({ _id: req.params.ThoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } }
  )
    .exec()
    .then((result) => {
      res.json(result);
    });
});



module.exports = router;
