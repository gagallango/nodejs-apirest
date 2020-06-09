const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')
const Tuit = require('./../models/tuit.model')

// NEW TUIT
router.get('/new', (req, res, next) => res.render('tuits/new-tuit'))
router.post('/new', (req, res, next) => {
    const { title, content } = req.body
    Tuit.create({ title, content, creatorID: req.user })
        .then(newTuit => {
            User.findByIdAndUpdate(newTuit.creatorID, { $push: { 'tuits': newTuit._id } })
                .then(res.redirect('/tuits'))
                .catch(err => next(new Error(err)))
        })
        .catch(err => console.log('Error', err))
})


//GET ALL TUITS
router.get('/', (req, res, next) => {
    Tuit.find()
        .then(allTuits => res.render('tuits/tuits', { tuits: allTuits }))
        .catch(err => console.log('Error', err))
})

//COASTERS DETS
router.get('/:id', (req, res, next) => {
    Tuit.findById(req.params.id)
        .populate('user')
        .then(tuitDetails => res.render('tuits/tuit-det', tuitDetails))
        .catch(err => console.log('Error', err))

})

module.exports = router