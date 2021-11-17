const Role = require('./Role');
const User = require('./User');
const Patient =require('./Patient');

// const Patient = require('./Patient');

// User.hasMany(Role,{
//     foreignKey:'role_id'
// });

// Role.belongsTo(User,{
//     foreignKey:'role_id',
//     onDelete:'SET NULL'
// });


Role.hasMany(User, {
    foreignKey: 'role_id'
});

User.belongsTo(Role,{
    foreignKey: 'role_id',
    onDelete: 'SET NULL' 
})

// User.hasMany(Patient, {
//     foreignKey:'user_id',
//     onDelete:'SET NULL'
// });

// Patient.belongsTo(User);

module.exports = {
    Role,
    User,
    Patient
};