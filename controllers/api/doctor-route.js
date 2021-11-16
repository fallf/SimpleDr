const router = require('express').Router();

const { Doctor } = require('../../models');

//GET /api/doctor
router.get('/', (req, res)=>{

    Doctor.findAll({
        attributes:[
            'id',
            'doc_name',
            'doc_last_name',
            'doc_username',
            'doc_email',
            'doc_password'
        ]
    }).then(dbData => res.json(dbData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//GET /api/doctor/1
router.get('/:id', (req,res)=>{
  
    Doctor.findOne({
        attributes:[
            'id',
            'doc_name',
            'doc_last_name',
            'doc_username',
            'doc_email',
            'doc_password'
        ],
        where:{
            id:req.params.id
        }
    }).then(dbData => {
        if (!dbData){
            res.status(404).json({ message:'No Doctor found'});
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
    Doctor.create({
        doc_name: req.body.doc_name,
        doc_last_name: req.body.doc_last_name,
        doc_username: req.body.doc_username,
        doc_email: req.body.doc_email,
        doc_password:req.body.doc_password
    })
.then(dbDocData => {
    req.session.save(() => {
        req.session.id = dbDocData.id;
        req.session.doc_username = dbDocData.doc_username;
        req.session.loggedIn = true;
        
        res.json(dbDocData)
    });
})
});

//Verify doctor /api/doctor/login
router.post('/login', (req, res) => {
    // expects {doc_email: 'line@email.com, doc_password: 'password123"}
    Doctor.findOne({
        where: {
            doc_email: req.body.doc_email
        }
    })
    .then(dbDocData => {
        if(!dbDocData) {
            res.status(400).json({message: 'No doctor with that email address.'});
            return;
        }

       //Verify doctor password
        const validPassword = dbDocData.checkPassword(req.body.doc_password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }

    req.session.save(() => {
        // declare session variables
        req.session.id = dbDocData.id;
        req.session.doc_username = dbDocData.doc_username;
        req.session.loggedIn = true;

        res.json({doctor: dbDocData, message: 'You are now logged in doctor!'});
    });

  });
});

//PUT /api/doctor/1
router.put('/:id', (req, res)=>{
    Doctor.update(req.body,{
        individualHooks:true,
        where:{
            id:req.params.id
        }
    })
    .then(dbData => {
        if(!dbData[0]){
            res.status(404).json({message: 'No Doctor Found!'});
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
 Doctor.destroy({
     where:{
         id:req.params.id
     }  
 })
    .then(dbData =>{
        if(!dbData){
            res.status(404).json({ message: 'No Doctor found'});
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