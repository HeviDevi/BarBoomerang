const router = require("express").Router();
const  Cocktail  = require("../../models/Cocktail");
const User = require("../../models/User");

//CRUD operations for cocktail

router.post("/:id", (req, res) => {

  // Ensure the request body looks like this
  //   {
  //     "cocktailName": "intended cocktail name",
  //     "instructions": "intended instructions",
  //   },
  // Also include the user ID in the URL


  // We create a new cocktail by combining the request body with the user ID
  const newCocktailData = {
    ...req.body,
    userID: req.params.id,
  };
  Cocktail.create(newCocktailData)
  .then(data => { 
    return User.updateOne(
        { _id: data.userID }, 
        { $push: { cocktails: data._id } }
      )
  })
  .then(data => {
    res.json(data);
  });
});

router.get("/", (req, res) => {
  Cocktail.find({})
  .exec()
  .then(data => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  Cocktail.findOne({_id: req.params.id})
  .then(data => {
    res.json(data);
  })
})

router.put("/", (req, res) => {
  res.send("Cocktail Updated");
});

router.delete("/", (req, res) => {
  res.send("Cocktail Deleted");
});

module.exports = router;
