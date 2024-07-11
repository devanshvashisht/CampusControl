const { DataTypes } = require("sequelize"); //Datatype imported from the squelize package, used for defining type of each column

module.exports = (sequelize,DataTypes) =>{ //This line exports a function that takes two parameters, sequelize and DataTypes. This function defines the Student model and returns it. The function will be called in another part of the application (as seen in the previous code).
    const Student = sequelize.define('Student',{  // new model called student dfined using sequelze, takes two arguments, name of the model and obejct definign attributes
        rollNo: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        studentClass: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    return Student;
}; 