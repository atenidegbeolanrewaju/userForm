const router = require('express').Router();
const User = require('../models/user');
const validation = require('../validation')

router.get('/', (req, res) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(201).send({
                userCount: docs.length,
                users: docs
            })
        })
        .catch(err => console.log(err))
    
});

router.post('/', (req, res) => {
    const { error } = validation(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    };

    User.findOne({email: req.body.email})
        .exec()
        .then(result => {
            console.log('This is the result '+ result)
            if (result != null) return res.status(400).json('Email already existed, use another')
        })
        .catch(err => {g
            res.status(500).send({
                message: err
        })
    })
 
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        DOB: req.body.DOB
    })
    user.save()
        .then(result => {
            console.log(result)
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: err
            });
        })
});

module.exports = router;