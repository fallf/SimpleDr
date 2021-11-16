const router = require('express').Router();
const sequelize = require('../config/connection');
const {Doctor, Nurse, Patient} = require('../models');

//Homepage route
router.get('/home', (req, res) => {
  res.render('homepage')
})

//Doctor Login route
router.get('/doc-login', (req, res) => {
  // if(req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
    res.render('doc-login');
});

//Nurse Login route
router.get('/nur-login', (req, res) => {
  res.render('nur-login');
})

//Doctor Sign-up route
router.get('/doc-signup', (req, res) => {
  res.render('doc-signup')
})

//Nurse Sign-up route
router.get('/nur-signup', (req, res) => {
  res.render('nur-signup')
})

//Doctor Profile route
router.get('/doc-profile', (req, res) => {
  Doctor.findAll({
      attributes: [
          'id',
          'doc_name',
          'doc_last_name',
          'doc_username',
          'doc_email',
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
  .then(dbDocData => {
      console.log(dbDocData)
      const doctors = dbDocData.map(doctor => doctor.get({plain: true}));
      res.render('doc-profile', { doctors })
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