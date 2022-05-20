const router = require('express').Router();
const userRoutes = require('./user-routes')
const thoughRoutes = require('./thoughts-routes')

router.use('/users', userRoutes)
router.use('/thoughts', thoughRoutes)

module.exports = router