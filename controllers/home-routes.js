const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Patient } = require('../models');


//Homepage route
router.get('/login', (req, res) => {
  res.render('login')
})

// //Login route
// router.get('/login', (req, res) => {
//   // if(req.session.loggedIn) {
//   //   res.redirect('/');
//   //   return;
//   // }
//     res.render('login');
// });

// Sign-up route
router.get('/signup', (req, res) => {
  res.render('signup')
})

let user = 
//User Profile route
router.get('/profile', (req, res) => {
  console.log(req.session.user_id)
  User.findByPk(req.session.id, {
      attributes: [
          'id',
          'name',
          'last_name',
          'username',
          'email',
          'role_id'
      ],
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
      console.log(dbData)
      // const users = dbData.map(user => user.get({plain: true}));
      res.render('profile', dbData)
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  })
  
});



module.exports = router;