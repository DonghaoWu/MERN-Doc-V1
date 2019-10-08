//(*2.2)
const router = require("express").Router();

router.use("/user", require("./users"));
router.use("/auth", require("./auth"));
router.use("/profile", require("./profiles"));

module.exports = router;