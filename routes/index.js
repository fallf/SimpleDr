const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<body style='background-color:yellow'><h1 style='text-align:center' >Wrong Route!</h1></body>")
});

module.exports = router;