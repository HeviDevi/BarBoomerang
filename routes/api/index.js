const router = require('express').Router();
const usernameRoutes = require('./user-routes');
const cocktailRoutes = require('./cocktail-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', usernameRoutes);
router.use('/cocktails', cocktailRoutes);
router.use('/comments', commentRoutes);


module.exports = router;