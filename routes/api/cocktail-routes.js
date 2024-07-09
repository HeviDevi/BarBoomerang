const router = require("express").Router();
const Cocktail = require("../../models/Cocktail");
const User = require("../../models/User");

//CRUD operations for cocktail

router.post("/:id", (req, res) => {
  // Ensure the request body looks like this
  //   {
  //     "cocktailName": "intended cocktail name",
  //     "instructions": "intended instructions",
  //   },
  // Also include the user ID in the URL as a parameter of the request

  // We create a new cocktail by combining the request body with the user ID and then passing that new object to the create function
  const newCocktailData = {
    ...req.body,
    userID: req.params.id,
  };

  Cocktail.create(newCocktailData)

    //Then the user that added the cocktail will have the cocktail ID added to their cocktail array
    .then((data) => {
      return User.updateOne(
        { _id: data.userID },
        { $push: { cocktails: data._id } }
      );
    })
    .then((data) => {
      res.json(data);
    });
});

//Get all cocktails using the find method with no parameters
router.get("/", (req, res) => {
  Cocktail.find({})
    .exec()
    .then((data) => {
      res.json(data);
    });
});

//Get a single cocktail with the _id field as a parameter
router.get("/:id", (req, res) => {
  Cocktail.findOne({ _id: req.params.id }).then((data) => {
    res.json(data);
  });
});

// Update a cocktail by ID using the findOneAndUpdate method, we do not need to update the user's cocktail array, as the cocktail ID will not be altered.
router.put("/:id", (req, res) => {
  Cocktail.findOneAndUpdate({ _id: req.params.id }, req.body).then((data) => {
    res.send({
      message: `'${data.cocktailName}' by user with ID ${data.userID} has been updated`,
    });
  });
});

// Delete a cocktail by ID using the findOneAndDelete method
// It is important to remove the cocktail from the User's cocktail array first. So we are certain we will be left with "orphaned" data.
router.delete("/:id", (req, res) => {
  User.updateOne(
    { cocktails: req.params.id },
    { $pull: { cocktails: req.params.id } }
  )
    .exec()
    .then((data) => {
      console.log("Cocktail removed from user's cocktail array");
    })
    .catch((err) => {
      console.log(err, "Error removing cocktail from user's cocktail array");
    });
  Cocktail.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.send({ message: `${data.cocktailName} has been deleted` }),
        console.log("Cocktail deleted");
    })
    .catch((err) => {
      console.log(err, "Error deleting cocktail");
    });
});


//CRUD routes for COMMENTS

router.post("/:CocktailId/comments/:userId", async (req, res) => {
  // Ensure the request body looks like this & include the user ID in the URL as a parameter of the request
  //   {
  //     "commentText": "intended comment",
  //   },

  // We find the cocktail by ID and then push the new comment to the comments array
  req.body.userId = req.params.userId,
  Cocktail.findOneAndUpdate({ _id: req.params.CocktailId },
    { $push: { comments: req.body } },
    { new: true }
  )
    .exec()
    .then((result) => {
      res.json(result);
    });
});

// Delete a comment by ID using the findOneAndUpdate method
router.delete("/:CocktailId/comments/:commentId", (req, res) => {
  // We find the cocktail by ID and then pull the comment from the comments array
  Cocktail.findOneAndUpdate({ _id: req.params.CocktailId },
    { $pull: { comments: { commentId: req.params.commentId } } }
  )
    .exec()
    .then((result) => {
      res.json(result);
    });
});



module.exports = router;
