const router = require('express').Router();

const { Nurse } = require('../../models');

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

module.exports = router;