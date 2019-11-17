const express = require('express');

// database access using knex
const db = require('./data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json({error: The account could not be located})
        })

});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('accounts').where({id})
        .then(account => {
            if (account[0]) {
                res.status(200).json(account);
            }
            else {
                res.status(404).json({message: "No account found with specified id"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "Cannot locate account"})
        })

});

router.post('/', (req, res) => {
    db('accounts')

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;