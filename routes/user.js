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

router.post('/', async (req, res) => {
    const { error } = validation(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    };

    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send('Email already exist')
 
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        DOB: req.body.DOB
    })
    user.save()
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: err
            });
        })
});

module.exports = router;