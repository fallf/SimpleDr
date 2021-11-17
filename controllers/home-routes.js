const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Patient } = require('../models');


//Homepage route
router.get('/home', (req, res) => {
  res.render('homepage')
})

//Login route
router.get('/login', (req, res) => {
  // if(req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
    res.render('login');
});

// Sign-up route
router.get('/signup', (req, res) => {
  res.render('signup')
})
let user = 
//Doctor Profile route
router.get('/profile', (req, res) => {
  User.findByPk(req.session.user_id, {
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
      const users = dbData.map(doctor => doctor.get({plain: true}));
      res.render('profile', { doctors })
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  })
  
});

//Nurse Profile route
router.get('/nurse-profile', (req, res) => {
  Nurse.findAll({
    attributes: [
        'id',
        'nur_name',
        'nur_last_name',
        'nur_username',
        'nur_email',
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
.then(dbNurData => {
    console.log(dbNurData)
    const nurses = dbNurData.map(nurse => nurse.get({plain: true}));
    res.render('nurse-profile', { nurses })
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
})
})



module.exports = router;