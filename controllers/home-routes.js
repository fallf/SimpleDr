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
  })
  .then(userData => {
      // console.log(dbData)
      User.findAll({
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
      }).then (docData => {
        console.log(docData)
        const user = userData.get({plain: true});
        const doctors = docData.map(user => user.get({plain: true}));
        // console.log(user.role_id)
        // console.log(req.session)
        res.render('profile', {
          user, 
          doctors,
          loggedIn: req.session.loggedIn,
        })
      });
      
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  })
  
});

//Doctor email route
router.post('/send', (req, res) => {
})


module.exports = router;