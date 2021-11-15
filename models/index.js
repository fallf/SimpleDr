
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Nurse = require('./Nurse');


Doctor.hasMany(Patient,{
    foreignKey:'doctor_id' 
})

Patient.belongsTo(Doctor,{
    foreignKey:'doctor_id',
    onDelete:'SET NULL'
})


module.exports ={
    Doctor,
    Nurse,
    Patient};