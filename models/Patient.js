const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Patient extends Model {}

Patient.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        p_name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        p_lname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        p_email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true

        },
        p_user:{
            type: DataTypes.STRING,
            allowNull: false
           
        },
        p_condition:{
            type:DataTypes.STRING,
            allowNull:false
        },
        p_user_comment:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },
    {   
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName:'patient'
    }
)

module.exports = Patient;

