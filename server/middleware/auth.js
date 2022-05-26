const { User } = require('../models/user_model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// VERIFY TOKEN
exports.checkToken = async (req, res, next) => {
  try {
    if (req.headers['x-access-token']) {
      const accessToken = req.headers['x-access-token']
      const { _id, email, exp } = jwt.verify(accessToken, process.env.DB_SECRET)

      // console.log(_id)
      // console.log(email)
      // console.log(exp)
      res.locals.userData = await User.findById(_id)
      next()
    } else {
      next()
    }
  } catch (error) {
    return res.status(401).json({ error: 'Wrong information', errors: error })
  }
}

exports.checkLoggedIn = (req, res, next) => {
  const user = res.locals.userData
  if (!user) return res.status(401).json({ error: 'User not found' })

  req.user = user
  next()
}
