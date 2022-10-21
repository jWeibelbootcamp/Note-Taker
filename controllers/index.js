const router = require('express').Router();
const apiRoutes = require('./api/api');
const viewRoutes = require('./views');
router.use('/api', apiRoutes);
router.use('/', viewRoutes);

module.exports = router;