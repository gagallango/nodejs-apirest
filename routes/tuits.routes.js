const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')
const Tuit = require('./../models/tuit.model')

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/')

router.get('/favs', checkLoggedIn, (req, res, next) => res.render('tuits/liked-tuit'))
router.post('/favs', checkLoggedIn, (req, res, next) => {
    const { user, tuit } = req.body
    let updateTuit = Tuit.findByIdAndUpdate(tuit, { $push: { likes: user } }, { new: true })
    let updateUser = User.findByIdAndUpdate(user, { $push: { likedTuits: tuit } }, { new: true })
    Promise.all([updateUser, updateTuit])
        .then(favedTuit => res.render('/tuits/favs', { tuit: favedTuit }))
        .catch(err => console.log(err))
})

router.get('/new', checkLoggedIn, (req, res, next) => res.render('tuits/new-tuit'))
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

router.get('/', (req, res, next) => {
    Tuit.find()
        .populate('creatorID')
        .then(allTuits => res.render('tuits/tuits', { tuits: allTuits }))
        .catch(err => console.log('Error', err))
})

router.get('/:id', checkLoggedIn, (req, res, next) => {
    Tuit.findById(req.params.id)
        .populate('creatorID')
        .then(tuitDetails => res.render('tuits/tuit-det', tuitDetails))
        .catch(err => console.log('Error', err))

})


module.exports = router