# MERN-Stack-Level2-RawDemo

## `Section: Backend`

## `Part 3: Set up User Route.`

### `Check Dependencies`

- express
- morgan
- nodemon
- mongoose
- express-validator
- 
- 


### `Step1: Set up User model`

#### `B. Create a models folder, create a index.js file inside of it`

`Location: new api folder, ./api/index.js`

- This index.js file is a central clearing house for our api routes, so we can access all api routes by going through "/api" first.

```js
const User = require('./User.js');
const Post = require('./Post.js');
const Profile = require('./Profile,js');

module.exports = { User, Post, Profile };
```

#### `C. Create User model.`

`Location: ./models/User.js`

```js
//Require dependency
const mongoose = require('mongoose');
//Create a schema, so UserSchema is a instance of mongoose Schema class
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
```
`note:`
- In this model, we use two mongoose built-in methods.
- One is mongoose.Schema, which will create a Schema instance.
- The other one is mongoose.model('user', UserSchema), takes two arguments, the first one as a collecion name in
MongoDB Altas, the second one is Schema instance name.

- In the end of this file, it export a Model.

- Create a Schema ====> Create a model ====> export the model

### `Step2: Create Post User Route`

#### `Install dependencies`
```bash
$ npm install express-validator
```

#### `Add post route validation`

```js
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route.');
  }
);

module.exports = router;
```

`Side-note: How does the route validation work?`

- In express route, there are 3 arguments, the second one is the validation one which is an option, if you have more than 1 validation, you should put them into a `[]`.
- In this case, we put validations in the second argument, and check three things:
`req.body.name`, `req.body.email`, `req.body.password`.

#### `Why we can check these three in this way? `
#### First, we already added middleware in server.js
```js
app.use(express.json({ extended: false }));
```
#### Second, it depends on the way we send data in Postman
<p align="center">
<img src="./assets/11.png" width=90%>
</p>
<p align="center">
<img src="./assets/12.png" width=90%>
</p>

- We invoke the built-in function `validationResult(req)`, req is the argument, the function will return error if some of the `req` is not satisfy the check conditions.

- If it has error, the route will return some error message.

#### `Add post route response`
