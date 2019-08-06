# MERN-Stack-Level2-RawDemo

## `Section: Backend`

## `Part 4: User Authentication / Login Route.`

### `Check Dependencies`

- express
- morgan
- nodemon
- mongoose
- express-validator (new)
- gravatar (new)
- bcryptjs (new)
- jsonwebtoken (new)

### `Step1: Import dependencies`

```js
const bcrypt = require('bcryptjs');//解码对比用
const {check, validationResult} = require(`express-validator`);//验证格式用
const jwt = require('jsonwebtoken');//生成token用
```

### `Step2: Create a Post auth route.`

```js
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

      if(!isMatch){
        return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
      }

      //之前的编码
      // const payload = {
      //   newUser: {
      //     id: newUser.id
      //   }
      // };

      //payload的命名规则。中间件的定义与使用都有规则。
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
```


`Side-Note:`
- 本段的逻辑是实现登陆。
- 输入两个值在request中， 一个是email， 一个是password，通过依赖中间件的过滤，如果符合格式就继续。
- 按照email去在Database中查找相关用户，如果没有就返回错误。
- 如果有该email用户，则用`await bcrypt.compare(password, user.password)`来解密输入的密码与储存在database中的密码对比，若相同，则继续;
- #### `生成一个payload，注意在auth.js中和user.js中都是用统一格式创造这个payload，但实际对象完全不一样，`这是中间件用法的难点`，在auth.js，user是指在database中查找出来的user，在user.js中，user是指刚创建的user。他们使用相同格式，因为在middleware的定义中使用的对象格式一样。`

- 最后，确定有该用户后，用该用户的id制作成一个token令牌。
