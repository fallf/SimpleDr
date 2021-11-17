const router = require('express').Router();

const { User, Role } = require('../../models');

//GET /api/user
router.get('/', (req, res)=>{

    User.findAll({
        attributes:[
            'id',
            'name',
            'last_name',
            'username',
            'email',
            'password',
            'role_id'
        ],
        include:[
            {
                model:Role,
                attributes:['name']
            }
        ]


        
    
    }).then(dbData => res.json(dbData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//GET /api/doctor/1
router.get('/:id', (req,res)=>{
  
    User.findOne({
        attributes:[
            'id',
            'name',
            'last_name',
            'username',
            'email',
            'password'
        ],
        where:{
            id:req.params.id
        },
        include:{
            model:'role',
            attributes:['id','name']
            
        }
    }).then(dbData => {
        if (!dbData){
            res.status(404).json({ message:'No User found'});
            return;
        }
        res.json(dbData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })

});

//POST /api/doctor
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password:req.body.password
    })
    
.then(dbData => {
    console.log(dbData)
    req.session.save(() => {
        req.session.user_id = dbData.id;
        req.session.username = dbData.username;
        req.session.loggedIn = true;
        
        res.json(dbData)
    });
})
});

//Verify doctor /api/doctor/login
router.post('/login', (req, res) => {
    // expects {doc_email: 'line@email.com, doc_password: 'password123"}
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbData => {
        if(!dbData) {
            res.status(400).json({message: 'No user with that email address.'});
            return;
        }

       //Verify tor password
        const validPassword = dbData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }

    req.session.save(() => {
        // declare session variables
        req.session.id = dbData.id;
        req.session.doc_username = dbData.username;
        req.session.loggedIn = true;

        res.json({user: dbData, message: 'You are now logged in doctor!'});
    });

  });
});

//PUT /api/doctor/1
router.put('/:id', (req, res)=>{
    User.update(req.body,{
        individualHooks:true,
        where:{
            id:req.params.id
        }
    })
    .then(dbData => {
        if(!dbData[0]){
            res.status(404).json({message: 'No user Found!'});
            return;
        }
        res.json(dbData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE /api/doctor/1
router.delete('/:id', (req, res)=>{
 User.destroy({
     where:{
         id:req.params.id
     }  
 })
    .then(dbData =>{
        if(!dbData){
            res.status(404).json({ message: 'No user found'});
            return;
        }
        res.json(dbData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
}); 

//logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      else {
        res.status(404).end();
      }
});

module.exports = router;