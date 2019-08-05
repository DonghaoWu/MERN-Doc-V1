const router = require('express').Router();

router.use('/user', require('./user'));
router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));
router.use("/post", require("./post"));

module.exports = router;

