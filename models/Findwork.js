const Sequelize = require('sequelize');

const db = require("../config/database");

const Findwork = db.define('gigs', {
    title: {
        type: Sequelize.STRING
    },
    technologies: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    },
})

module.exports = Findwork;