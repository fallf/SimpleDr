const seedDoctor = require('./doctor-seed');
const seedNurse = require('./nurse-seed');
const seedPatient = require('./patient-seed');

const sequelize = require('../config/connection');




const seedAll = async ()=>{
    await sequelize.sync({ force: true });

    console.log('\n-----DATABASE SYNCED-----\n');
    await seedDoctor();
    console.log('\n-----DOCTOR SEEDED-----\n');

    await seedNurse();
    console.log('\n------NURSE SEEDED-----\n');

    await seedPatient();
    console.log('\n-----PATIENT SEEDED-----\n');

    process.exit(0);
};

seedAll();