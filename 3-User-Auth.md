# MERN-Stack-Level2-RawDemo

## `Section: Backend`

## `Part 2: Set up User Route.`

### `Check Dependencies`

- express
- morgan
- nodemon
- mongoose

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

```flow
st => start: Start
e => end:End
```
