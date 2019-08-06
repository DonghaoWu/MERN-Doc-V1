const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      let userFindByEmail = await User.findOne({ email: email });

      if (userFindByEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // b. Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // c. Create a new user instance by User model, Now user is a real object
      user = new User({
        name,
        email,
        avatar,
        password
      });
      //console.log(newUser);

      // d. Encrypt password
      const salt = await bcrypt.genSalt(10);
      // Change the object attribute
      user.password = await bcrypt.hash(password, salt);
      // e. save the object in MongoDB Altas
      user.save();
      // f. Return json-web-token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        'mysecrettoken',
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token: token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
