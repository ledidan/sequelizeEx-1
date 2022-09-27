const Sequelize = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();
module.exports = new Sequelize(process.env.DATABASE_URL, "postgres", process.env.DATABASE_PW, {
    host: "localhost",
    dialect: "postgres",
    operatorAliases: false,
});