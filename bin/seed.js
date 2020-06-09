const mongoose = require('mongoose')
const User = require('../models/user.model')
const Tuit = require('../models/tuit.model')
const faker = require('faker')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

const dbtitle = 'node-apirest'
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useUnifiedTopology: true, useNewUrlParser: true })

const randomNum = (max) => Math.floor(Math.random() * (max - 1))

let allTuit = []
let allU = []

const deleteUsers = User.deleteMany()
const deleteTuit = Tuit.deleteMany()

Promise.all([deleteUsers, deleteTuit])
    .then(() => {
        let users = []
        for (let i = 1; i <= 20; i++) {
            let user = {
                username: faker.name.findName(),
                password: bcrypt.hashSync('123', salt),
                userTuits: [],
            }
            users.push(user)
        };
        return User.create(users)
    })
    .then(allUsers => {
        let promises = []
        allU = allUsers
        allUsers.forEach(user => {
            let tuits = []
            for (let i = 1; i <= 5; i++) {
                tuits.push({
                    content: faker.lorem.words(5),
                    creatorID: user._id,
                })
            }
            promises.push(Tuit.create(tuits)
                .then(createdTuits => {
                    allTuit.push(...createdTuits)
                    return createdTuits
                })
                .catch(err => err))
        })
        return Promise.all(promises)
    })
    .then(() => {
        let promises = []
        allTuit.forEach(tuit => {
            promises.push(User.findByIdAndUpdate(tuit.creatorID, { $push: { userTuits: tuit._id } }, { new: true }))
        })
        return Promise.all(promises)
    })
    .then((finished) => console.log(finished))
    .catch(err => console.log(`Ha ocurrido un error: ${err}`))