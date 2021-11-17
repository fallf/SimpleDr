const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//Create our User model
class User extends Model {
  //set p method to run on instance data to check password
  checkPassword(loginPw){
      return bcrypt.compareSync(loginPw, this.password);
  }

}

//Define table columns and configuration
User.init(
    {
        //Define columns and configurations
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }  
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               len: [4]
             }
        },
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
       hooks:{
           //encrypt password beforeCreate
           async beforeCreate(newDocData){
               newDocData.password = await bcrypt.hash(newDocData.password,10);
               return newDocData;
           },
           //encrypt password before Update
           async beforeUpdate(updatedDoc){
               updatedDoc.password = await bcrypt.hash(updatedDoc.password, 10);
               return updatedDoc;

           }
       },
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       //force model name to lowercase
       modelName: 'user'
    }
);

module.exports = User;

