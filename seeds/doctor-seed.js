
const {Doctor}=require('../models')

const doctorData = [
    {
        doc_name:'Mike',
        doc_last_name:'Jones',
        doc_username:'mjones1',
        doc_email:'m.jones@me.com',
        doc_password:'password1',
        
        
    }
];

const seedDoctor = () => Doctor.bulkCreate(doctorData, {individualHooks: true});

module.exports = seedDoctor;