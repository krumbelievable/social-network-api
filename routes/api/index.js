const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes'); //exporting our API routes.

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;