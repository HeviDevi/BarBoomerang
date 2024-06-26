const router = require('express').Router();


//CRUD operations for comment




router.post('/', (req, res) => {
    res.send("New Comment Added")
})

router.get('/', (req, res) => {
    res.send("All Comments")
})

router.delete('/', (req, res) => {
    res.send("Comment Deleted")
})





module.exports = router;