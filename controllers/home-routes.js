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
router.get('/profile', async (req, res) => {
  console.log(req.session.user_id)
  const singleUserData = await User.findByPk(req.session.user_id, {
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
  })

    const multiUserData = await User.findAll({
        attributes: [
          'id',
          'name',
          'last_name',
          'role_id'
        ],
        where: {
          role_id: 1
        },
        include: [
          {
            model: Role,
            attributes: ['name']
          }
        ] 
    })

    const patientsData = await Patient.findAll({
      attribute: [
        'id',
        'p_name',
        'p_lname',
        'p_email',
        'p_dob',
        'p_condition',
        'p_doc_comment',
      ],
      where: {
        p_doc_comment: null
      }
    })
        const user = singleUserData.get({plain: true});
        const doctors = multiUserData.map(user => user.get({plain: true}));
        const patients = patientsData.map(pat => pat.get({plain: true}));
        // console.log(user.role_id)
        // console.log(req.session)
        res.render('profile', {
          user, 
          doctors,
          patients,
          loggedIn: req.session.loggedIn,
        })    
});

//Doctor email route
router.post('/send', (req, res) => {
  
})


module.exports = router;