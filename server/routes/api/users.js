const express = require('express')
const router = express.Router()
require('dotenv').config()
const { checkLoggedIn } = require('../../middleware/auth')
const { grantAcces } = require('../../middleware/roles')
const { contactMail, registerEmail } = require('../../config/email')

const { User } = require('../../models/user_model')

router.route('/register').post(async (req, res) => {
  try {
    // 1 CHECK IF EMAIL TAKEN
    if (await User.emailTaken(req.body.email)) {
      return res.status(400).json({ message: 'Email already taken' })
    }

    // 2 CREATING MODEL  HASH PASSWORD
    const user = new User({
      email: req.body.email,
      password: req.body.password
    })

    // 3 GENERATE TOKEN
    const token = user.generateToken()
    const doc = await user.save()

    // SEND EMAIL GMAIL
    const emailToken = user.generateRegisterToken()
    await registerEmail(doc.email, emailToken)

    // SAVE... SEND TOKEN WITH COOKIE
    res.cookie('x-access-token', token).status(200).send(getUserProps(doc))
  } catch (error) {
    res.status(400).json({ message: 'Error', error: error })
  }
})

// SIGN IN
router.route('/signin').post(async (req, res) => {
  try {
    // FIND USER
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: 'wrong email' })

    // COMPARE PASSWORD
    const compare = await user.comparePassword(req.body.password)
    if (!compare) return res.status(400).json({ message: 'invalid password' })

    // GENERATE TOKEN
    const token = user.generateToken()
    res.cookie('x-access-token', token).status(200).send(getUserProps(user))
  // RESPONSE
  } catch (error) {
    res.status(400).json({ message: 'Error', error: error })
  }
})

// GRANT ACCES
router
  .route('/profile')
  .get(checkLoggedIn, grantAcces('readOwn', 'profile'), async (req, res) => {
    try {
      const permission = res.locals.permission
      const user = await User.findById(req.user._id)
      if (!user) return res.status(400).json({ message: 'User not found' })

      res.status(200).json(permission.filter(user._doc))
    } catch (error) {
      return res.status(400).send(error)
    }
  })

  .patch(
    checkLoggedIn,
    grantAcces('updateOwn', 'profile'),
    async (req, res) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $set: {
              firstname: req.body.firstname,
              lastname: req.body.lastname
            }
          },
          { new: true }
        )
        if (!user) return res.status(400).json({ message: 'User not found' })

        res.status(200).json(getUserProps(user))
      } catch (error) {
        res.status(400).json({ message: 'Cant updating', error: error })
      }
    }
  )

// UPDATE EMAIL
router
  .route('/update_email')
  .patch(
    checkLoggedIn,
    grantAcces('updateOwn', 'profile'),
    async (req, res) => {
      try {
        // / make
        if (await User.emailTaken(req.body.newemail)) {
          return res.status(400).json({ message: 'Sorry email taken' })
        }

        const user = await User.findOneAndUpdate(
          { _id: req.user._id, email: req.body.email },
          {
            $set: {
              email: req.body.newemail
            }
          },
          { new: true }
        )
        if (!user) return res.status(400).json({ message: 'User not found' })

        const token = user.generateToken()
        res
          .cookie('x-access-token', token)
          .status(200)
          .send({ email: user.email })
      } catch (error) {
        res.status(400).json({ message: 'Problem updating', error: error })
      }
    }
  )
// USER AUTHENTICATED
router.route('/isauth').get(checkLoggedIn, async (req, res) => {
  res.status(200).send(getUserProps(req.user))
})

// GET INFORMATION ABOUT USER
const getUserProps = (user) => {
  return {
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    verified: user.verified
  }
}

// CONTACT FROM
router.route('/contact').post(async (req, res) => {
  try {
    await contactMail(req.body)
    res.status(200).send('ok')
  } catch (error) {
    res.status(400).json({ message: 'Please, try again later', error: error })
  }
})

router.route('/verify').get(async (req, res) => {
  try {
    const token = User.validateToken(req.query.validation)
    const user = await User.findById(token._id)
    if (!user) return res.status(400).json({ message: 'User not found!' })
    if (user.verified) {
      return res.status(400).json({ message: 'Already verified!' })
    }

    user.verified = true
    await user.save()
    res.status(200).send(getUserProps(user))
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
