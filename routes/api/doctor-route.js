const router = require('express').Router();

const { Doctor } = require('../../models');

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

router.post('/', (req, res) => {
    Doctor.create({
        doc_name: req.body.doc_name,
        doc_last_name: req.body.doc_last_name,
        doc_username: req.body.doc_username,
        doc_email: req.body.doc_email,
        doc_password:req.body.doc_password
    })
.then(dbData => res.json(dbData))
    .catch(err =>{
    res.status(500).json(err);
    });
});

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

module.exports = router;