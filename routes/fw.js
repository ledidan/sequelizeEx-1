const express = require("express");
const router = express.Router();
const db = require("../config/database");
const findWork = require("../models/Findwork");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// GET gig list
router.get("/", (req, res) =>
    findWork
    .findAll()
    .then((data) => {
        res.render('fw', {
            data
        });
    })
    .catch((err) => console.log(err))
);
// Display add form
router.get("/add", (req, res) => res.render("add"))
// Add a gig
router.post("/add", (req, res) => {
    // Split each key in data;
    let {
        title,
        technologies,
        budget,
        description,
        contact_email
    } = req.body;
    // Validate field form
    let errors = [];
    if (!title) {
        errors.push({
            message: 'Please add a title'
        })
    }
    if (!technologies) {
        errors.push({
            message: 'Please add a technologies'
        })
    }
    if (!budget) {
        errors.push({
            message: 'Please add a budget'
        })
    }
    if (!description) {
        errors.push({
            message: 'Please add a description'
        })
    }
    if (!contact_email) {
        errors.push({
            message: 'Please add a contact_email'
        })
    }
    // Checks for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })

    } else {

        if (!budget) {
            budget = 'Unknown'
        } else {
            budget = `$${budget}`;
        }

        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        // Insert into table
        findWork.create({
                title,
                technologies,
                budget,
                description,
                contact_email
            })
            .then((item) => res.redirect('/fw'))
            .catch(err => console.log(err))
    }
});

router.get('/search', (req, res) => {
    let {
        term
    } = req.query;

    term = term.toLowerCase();
    findWork.findAll({
        where: {
            technologies: {
                [Op.like]: '%' + term + '%'
            }
        }
    }).then((data => res.render('fw', {
        data
    }))).catch(err => console.log(err));

})

router.delete('/delete', (req, res, next) => {
    let title = req.params.title
    findWork.destroy({
        where: {
            title: title
        },
        force: true
    }).then(() => res.redirect('back')).catch(next)
})


module.exports = router;