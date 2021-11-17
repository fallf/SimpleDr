const router = require('express').Router();
const { Patient, Doctor} = require('../../models');

router.get('/', (req, res)=>{

    Patient.findAll({
        attributes:[
            'id',
            'p_name',
            'p_lname',
            'p_email',
            'p_dob',
            'p_condition',
            'p_doc_comment'
            
        ],
        include:[
            {
               model:Doctor,
               attributes:[
                'id', 'doc_name','doc_last_name'  
               ] 
            }
        ]
        
    }).then(dbData => res.json(dbData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});


router.get('/:id', (req,res)=>{
  Patient.findOne({
      where:{
          id:req.params.id
      },
      attributes:[
        'id',
        'p_name',
        'p_lname',
        'p_email',
        'p_dob',
        'p_condition',
        'p_doc_comment',
        'doctor_id'
      ],
      include:[
        {
           model:Doctor,
           attributes:[
            'id', 'doc_name','doc_last_name'  
           ] 
        }
    ]
  })
  .then(dbData => {
      if(!dbData){
          res.status(404).json({message: 'No Patient Found'});
          return;
      }
      res.json(dbData);
  })
  .catch(err =>{
      console.log(err);
      res.status(500).json(err);
  })
})

router.post('/',(req,res)=>{
     Patient.create({
         p_name:req.body.p_name,
         p_lname:req.body.p_lname,
         p_email:req.body.p_email,
         p_dob:req.body.p_dob,
         p_condition:req.body.p_condition,
         p_doc_comment:req.body.p_doc_comment,
         doctor_id:req.body.doctor_id
     })
     .then(dbData => res.json(dbData))
     .catch(err =>{
         console.log(err);
         res.status(500).json(err);
     })
})

router.put('/:id', (req,res)=>{
   Patient.update(
       {
        p_name:req.body.p_name,
        p_lname:req.body.p_lname,
        p_email:req.body.p_email,
        p_dob:req.body.p_dob,
        p_condition:req.body.p_condition,
        p_doc_comment:req.body.p_doc_comment,
        doctor_id:req.body.doctor_id 
       },
       {
           where:{
               id:{
                   id:req.params.id
               }
           }
       }
   )
   .then(dbData =>{
       if(!dbData){
           res.status(404).json({ message:'No Patient found!'});
           return;
       }
       res.json(dbData);
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json(err);
   });
})

router.delete('/:id', (req,res)=>{
  console.log('id', req.params.id);

  Patient.destroy({
      where:{
          id: req.params.id
      }
  })
  .then(dbData => {
      if (!dbData){
        res.status(404).json({ message:'No Patient found!'});
        return;
      }
      res.json(dbData);
  })
  .catch(err =>{
      console.log(err);
      res.status(500).json(err);
  })
})

module.exports= router;