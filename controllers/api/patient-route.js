const router = require('express').Router();
const { Patient, User} = require('../../models');
// const nodemailer = require('nodemailer');

//create transporter 
// let transporter = nodemailer.createTransport({
//     host: 'smtp.mail.yahoo.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'simpledoctesting@yahoo.com',
//         pass: 'bunooyytiaucgufb',
//     },
//     tls:{
//         rejectUnauthorized: false
//     }
// });



router.get('/', (req, res)=>{

    Patient.findAll({
        attributes:[
            'id',
            'p_name',
            'p_lname',
            'p_email',
            'p_dob',
            'p_condition',
            'p_doc_comment',
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
    console.log(req.body)
    Patient.create({
        p_name:req.body.p_name,
        p_lname:req.body.p_lname,
        p_email:req.body.p_email,
        p_dob:req.body.p_dob,
        p_condition:req.body.p_condition,
        p_doc_comment:req.body.p_doc_comment,
        user_id:req.body.user_id
    })
    .then(dbData => res.json(dbData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/:id', (req,res)=>{
   Patient.update(req.body, {
       where: {
           id: req.params.id
       }
   })
   .then(dbData =>{
       if(!dbData[0]){
           res.status(404).json({ message:'No Patient found!'});
           return;
       }
    //    console.log(dbData.get({plain: true}))
    //     //send mail with defined transport object
    //     let mailOptions = {
    //     from: '"SimpleDOc"<simpledoctesting@yahoo.com>', // sender address
    //     to: 'marvin.ren@yale.edu', //list of receivers 
    //     subject: 'Hello',
    //     text: 'Hello, thanks for the email!',
    //     html: output, // html body
    //     };
    //    transporter.sendMail(mailOptions, (error, info)=> {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log("Message sent: %s", info.messageId);
    //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    //     res.render('contact', {layout: false, msg:'Email has been sent'});
    //    });

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