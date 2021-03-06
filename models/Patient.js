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
        p_dob:{
            type: DataTypes.STRING,
            allowNull: false
           
        },
        p_condition:{
            type:DataTypes.STRING,
            allowNull:false
        },
        p_doc_comment:{
            type:DataTypes.STRING,
            allowNull:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
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

