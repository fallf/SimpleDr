const {Nurse}=require('../models');

const nurseData = [
    {
        nur_name:'Jane',
        nur_last_name:'Stevens',
        nur_username:'Jstevens1',
        nur_email:'j.stevens@me.com',
        nur_password:'password1'
    }
];

const seedNurse = () => Nurse.bulkCreate(nurseData, {individualHooks: true});

module.exports =seedNurse;