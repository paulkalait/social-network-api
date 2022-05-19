const { User } = require('../Models')

const userController = {
    
    GetAllUsers(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    },


    // get one user by id
    getUserById({ params }, res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },


    updateUser({ params}, res){
        User.findOneAndUpdate({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    }
}

module.exports = userController