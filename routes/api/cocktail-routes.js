const router = require("express").Router();
const  Cocktail  = require("../../models/Cocktail");

//CRUD operations for cocktail

router.post("/", (req, res) => {
  res.send("New Cocktail Added");
});

router.get("/", (req, res) => {
  res.send("All Cocktails");
});

router.put("/", (req, res) => {
  res.send("Cocktail Updated");
});

router.delete("/", (req, res) => {
  res.send("Cocktail Deleted");
});

module.exports = router;
