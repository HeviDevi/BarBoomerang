const router = require('express').Router();





//CRUD operations for username



router.post('/', (req, res) => {
    res.send("New User Added")
})

router.get('/', (req, res) => {
    res.send("All Users")
})

router.put('/', (req, res) => {
    res.send("User Updated")
})

router.delete('/', (req, res) => {
    res.send("User Deleted")
})



module.exports = router;