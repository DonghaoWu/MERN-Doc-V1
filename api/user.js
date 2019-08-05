const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs');

const { User } = require('../models');

//@route   Post api/user
//@desc    Register new user
//@access  Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more charters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
    try {
      // a. See if user exists
      let user = await User.findOne({ email: email });
  
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
  
      // b. Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // c. Create a new user instance by User model, Now user is a real object
      newUser = new User({
        name,
        email,
        avatar,
        password
      });
      //console.log(user);
  
      // d. Encrypt password
      const salt = await bcrypt.genSalt(10);
      // Change the object attribute
      newUser.password = await bcrypt.hash(password, salt);
      // e. save the object in MongoDB Altas
      newUser.save();
      // f. Return json-web-token
      res.send('User register');

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
