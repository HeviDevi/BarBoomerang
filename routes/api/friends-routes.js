const router = require("express").Router();

//CRUD operations for friends

router.post("/", (req, res) => {
  res.send("New Friend Added");
});

router.get("/", (req, res) => {
  res.send("All Friends");
});

router.delete("/", (req, res) => {
  res.send("Comment Deleted");
});

module.exports = router;
