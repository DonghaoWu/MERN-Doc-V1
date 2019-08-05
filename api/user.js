const router = require("express").Router();

//@route   Post api/user
//@desc    Register new user
//@access  Public

router.get(`/`, (req, res) =>{
  res.send(`This is user route.`)
})

module.exports = router;