const router = require('express').Router();

const { Nurse } = require('../../models');

//GET /api/nurse
router.get('/', (req, res)=>{

    Nurse.findAll({
        attributes:[
            'id',
            'nur_name',
            'nur_last_name',
            'nur_username',
            'nur_email',
            'nur_password'
        ]
    }).then(dbData => res.json(dbData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//GET /api/nurse/1
router.get('/:id', (req,res)=>{
  
    Nurse.findOne({
        attributes:[
            'id',
            'nur_name',
            'nur_last_name',
            'nur_username',
            'nur_email',
            'nur_password'
        ],
        where:{
            id:req.params.id
        }
    }).then(dbData => {
        if (!dbData){
            res.status(404).json({ message:'No Nurse found'});
            return;
        }
        res.json(dbData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })

});

//POST /api/nurse
router.post('/', (req, res) => {
    Nurse.create({
        nur_name: req.body.nur_name,
        nur_last_name: req.body.nur_last_name,
        nur_username: req.body.nur_username,
        nur_email: req.body.nur_email,
        nur_password:req.body.nur_password
    })
.then(dbData => res.json(dbData))
    .catch(err =>{
    res.status(500).json(err);
    });
});

//Verify nurse /api/nurse/login
router.post('/login', (req, res) => {
    // expects {nur_email: 'line@email.com, nur_password: 'password123"}
    Nurse.findOne({
        where: {
            nur_email: req.body.nur_email
        }
    })
    .then(dbNurData => {
        if(!dbNurData) {
            res.status(400).json({message: 'No nurse with that email address.'});
            return;
        }

       //Verify doctor password
        const validPassword = dbNurData.checkPassword(req.body.nur_password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }

    req.session.save(() => {
        // declare session variables
        req.session.id = dbNurData.id;
        req.session.doc_username = dbNurData.nur_username;
        req.session.loggedIn = true;

        res.json({nurse: dbNurData, message: 'You are now logged in nurse!'});
    });

  });
});

//PUT /api/nurse/1
router.put('/:id', (req, res)=>{
    Nurse.update(req.body,{
        individualHooks:true,
        where:{
            id:req.params.id
        }
    })
    .then(dbData => {
        if(!dbData[0]){
            res.status(404).json({message: 'No Nurse Found!'});
            return;
        }
        res.json(dbData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE /api/nurse/1
router.delete('/:id', (req, res)=>{
 Nurse.destroy({
     where:{
         id:req.params.id
     }  
 })
    .then(dbData =>{
        if(!dbData){
            res.status(404).json({ message: 'No Nurse found'});
            return;
        }
        res.json(dbData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//#####################logout

module.exports = router;