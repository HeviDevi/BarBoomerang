const router = require('express').Router();
const usernameRoutes = require('./user-routes');
const cocktailRoutes = require('./cocktail-routes');
const commentRoutes = require('./comment-routes');
const friendsRoutes = require('./friends-routes');

router.use('/users', usernameRoutes);
router.use('/cocktails', cocktailRoutes);
router.use('/comments', commentRoutes);
router.use('/friends', friendsRoutes);

module.exports = router;