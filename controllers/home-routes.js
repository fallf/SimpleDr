const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Patient, Role } = require('../models');


//Homepage route
router.get('/login', (req, res) => {
  // if(req.session.loggedIn) {
  //   res.redirect('/login');
  //   return;
  // }
  res.render('login')
})

// Sign-up route
router.get('/signup', (req, res) => {
  res.render('signup')
})

//User Profile route
router.get('/profile', (req, res) => {
  console.log(req.session.user_id)
  User.findByPk(req.session.user_id, {
      attributes: [
          'id',
          'name',
          'last_name',
          'username',
          'email',
          'role_id'
      ],

      include:[
        {
          model:Role,
          attributes:['id', 'name']
        }
      ]
    //   include: [
    //       {
    //           model: Patient,
    //           attributes: [
    //               'id',
    //               'p_name',
    //               'p_lname',
    //               'p_dob',
    //               'p_condition',
    //               'p_doc_comment'
    //           ]
    //       }
    //   ]
  })
  .then(dbData => {
      // console.log(dbData)
      const user = dbData.get({plain: true});
      console.log(user.role_id)
      console.log(req.session)
      res.render('profile', {user,
      loggedIn: req.session.loggedIn,
      })
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  })
  
});



module.exports = router;