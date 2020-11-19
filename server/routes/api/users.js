const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const formatter = require('../utils');
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;  
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);
  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(frontUser => res.json({ user: frontUser }))
    .catch((error) => {
      res.status(500).json({ error });
    });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({user: user.toAuthJSON()})
      .catch((error) => {
        res.status(500).json({ error });
      });;
    }
    return status(400).info;
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


//GET user by id route (required, only authenticated users have access)
router.get('/users/:id', auth.required, async (req, res, next) => {
  const userId = req.params.id;

  const user = await Users.findById(userId);
  if (!user) {
    return res.sendStatus(400);
  }
  return res.json({ user: user.toAuthJSON() });
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, async (req, res, next) => {
  const { payload: { id } } = req;

  const user = await Users.findById(id);
  if (!user) {
    return res.sendStatus(400);
  }
  return res.json({ user: user.toAuthJSON() });
});

router.patch('/', auth.required, async (req, res, next) => {
  const { payload, body: updates} = req;

  delete updates.username;
  delete updates.email;
  delete updates.role;
  delete updates.userBoard;

  try {
    const user = await Users.findByIdAndUpdate(payload.id, updates);
    res.json({ user });
  }
  catch( error ){
    console.log(error);
    res.status(500).json({ error });
  }
});



module.exports = router;