const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//Create our User model
class Doctor extends Model {
  //set p method to run on instance data to check password
  checkPassword(loginPw){
      return bcrypt.compareSync(loginPw, this.doc_password);
  }

}

//Define table columns and configuration
Doctor.init(
    {
        //Define columns and configurations
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        doc_name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        doc_last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        doc_username:{
         type:DataTypes.STRING,
         allowNull:false
        },
        doc_email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }  
        },
        doc_password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               len: [4]
             }
        }
    },
    {
       hooks:{
           //encrypt password beforeCreate
           async beforeCreate(newDocData){
               newDocData.doc_password = await bcrypt.hash(newDocData.doc_password,10);
               return newDocData;
           },
           //encrypt password before Update
           async beforeUpdate(updatedDoc){
               updatedDoc.doc_password = await bcrypt.hash(updatedDoc.doc_password, 10);
               return updatedDoc;

           }
       },
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       //force model name to lowercase
       modelName: 'doctor'
    }
);

module.exports = Doctor;

