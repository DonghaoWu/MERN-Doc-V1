//*4.2, *5.1
const router = require('express').Router();
const auth = require('../middleware/auth');
const config = require('config');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { User } = require('../models');

//@route   Get api/auth
//@desc    Authenticate user & get token
//@access  Public

router.get(`/`, auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

//@route   Post api/auth
//@desc    Login a user & get token
//@access  Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
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


//(*2.3)
// const router = require("express").Router();

// router.get(`/`, (req, res) =>{
//   res.send(`This is Auth route.`)
// })

module.exports = router;

