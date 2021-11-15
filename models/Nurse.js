const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Nurse extends Model {
  checkPassword(loginPw){
      return bcrypt.compareSync(loginPw, this.nur_password);
  }

}

Nurse.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        nur_name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        nur_last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nur_username:{
         type:DataTypes.STRING,
         allowNull:false
        },
        nur_email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }  
        },
        nur_password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               len: [4],
               
             }
        }

    },
    {
       hooks:{
           async beforeCreate(newNurData){
               newNurData.nur_password = await bcrypt.hash(newNurData.nur_password,10);
               return newNurData;
           },
           async beforeUpdate(updatedNur){
               updatedNur.nur_password = await bcrypt.hash(updatedNur.nur_password, 10);
               return updatedNur;

           }
       },
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       modelName: 'nurse'
    }
    
);

module.exports = Nurse;