const { User } = require('../Models')
// const { db } = require('../Models/User')

const userController = {
    
    getAllUsers(req, res){
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

    createUser({ body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },


    updateUser({ body, params }, res){
        User.findOneAndUpdate({_id: params.id}, body, { new: true})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },

    // delete user
    deleteUser({ params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => re.json(dbUserData))
        .catch(err => res.json(err))
    },

    deleteFriend({ params}, res){
        User.findOneAndUpdate({
            _id: params.userId
        },
        {
            $pull: { friends: params.friendsId}
        },
        {
            new: true
        })
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch( err => res.json(err))
    }
}

module.exports = userController