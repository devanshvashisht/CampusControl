const { Sequelize, DataTypes } = require('sequelize'); //This line imports the Sequelize class from the sequelize package. Sequelize is an ORM (Object-Relational Mapping) library for Node.js.
require('dotenv').config(); // stores details like database connection securely, loads environment variables from a .env file into process.env using the dotenv package

const sequelize = new Sequelize ("postgresql://devanshv:Pass123@localhost:5432/campus",{ // creates sequelize instance using database url
    dialect: 'postgresql', // type of database
    logging:false // sql query logging set to false, disabled
});

const db ={}; //An empty object 'db' is created to hold the Sequelize instance and the models.
db.sequelize = sequelize; //instance
db.Sequelize = Sequelize; //class added

db.Student = require('./student')(sequelize,Sequelize); //student model imported and intiailized with sequelize instance ans Sequelize class
module.exports = db; //db exported as a module



