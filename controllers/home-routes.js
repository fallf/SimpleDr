const router = require('express').Router();
const sequelize = require('../config/connection');
const {Doctor, Nurse, Patient} = require('../models');

//Home page route(###currently connected to Doctor###)
router.get('/', (req, res) => {
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
      res.render('doc-homepage', { doctors })
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  })
  
});

//General login route
router.get('/login', (req, res) => {
  // if(req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
    res.render('login');
});

//Nurse homepage route
router.get('/nurse-home', (req, res) => {
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
    res.render('nursehome', { nurses })
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
})
})


module.exports = router;