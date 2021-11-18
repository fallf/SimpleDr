const router = require('express').Router();
const { Patient, User} = require('../../models');

router.get('/', (req, res)=>{

    Patient.findAll({
        attributes:[
            'id',
            'p_name',
            'p_lname',
            'p_email',
            'p_user',
            'p_condition',
            'p_user_comment'
            
        ],
        include:[
            {
               model:User,
               attributes:[
                'id', 'name','last_name'  
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
        'p_user',
        'p_condition',
        'p_user_comment',
        'user_id'
      ],
      include:[
        {
           model:User,
           attributes:[
            'id', 'name','last_name'  
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
         p_user:req.body.p_user,
         p_condition:req.body.p_condition,
         p_user_comment:req.body.p_user_comment,
         user_id:req.body.user_id
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
        p_user:req.body.p_user,
        p_condition:req.body.p_condition,
        p_user_comment:req.body.p_user_comment,
        user_id:req.body.user_id 
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