const express = require('express');

// database access using knex
const db = require('./data/dbConfig');

const router = express.Router();

//working
router.get('/', (req, res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json({error: "Error accessing the accounts from the accounts database"})
        })

});

//working
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('accounts').where({id}).first()
        .then(account => {
            if (account) {
                res.status(200).json(account);
            }
            else {
                res.status(404).json({message: "No account found with specified id"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "Cannot locate account in accounts database"})
        })

});

//working
router.post('/', (req, res) => {

    //remember to validate the data sent by the client

    db.insert(req.body, 'id') //ignore console warning on SQLite (safely) 
        .into('accounts')
            .then(ids => {
                    res.status(200).json(ids);
            })
            .catch(err => {
                res.status(500).json({error: "Unable to insert into accounts database"})
            })
});


// working 
router.put('/:id', (req, res) => {

    const {id} = req.params;
    const changes = req.body;

    db('accounts')
    .where({id})
    .update(changes)
        .then(count => { //count = how many are updated
                res.status(200).json(count);
        
        })
        .catch(err => {
            res.status(500).json({error: "Unable to update the account"})
        })

});


//working 
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db('accounts').where({id}).delete()
    .then(count => { //count = how many are deleted
        res.status(200).json(count);

    })
    .catch(err => {
        res.status(500).json({error: "Unable to delete the account"})
    }) 

});

module.exports = router;