const { User, Thought } = require("../Models")


// Methods bellow

const thoughtsController = {
    addThought({params, body}, res){
        console.log(body)
        Thought.create(body).then(({_id}) => {
            return User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {
                // push the thoughts id into User's array we want to update
                $push: {thoughts: _id}
            },
            {
                new: true
            }
            )
            .then((dbUserData) => {
                if(!dbUserData){
                    res.status(404).json({message: "no USer found with this id"})
                }
                res.json(dbUserData)
            })
            .catch((err) => res.json(err))
        })
    },

    addReaction({params, body}, res){
        // updating the thought document
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        },
        {
            $push: { reactions: body}
        },
        {
            new: true
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "no thought found on this user to add a reaction"})
            }
            res.json(dbUserData)
        })
        .catch( err => res.json(err))
    },


    removeReaction({params}, res){
        // updating the thought document
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        },
        {
            $pull: { reactions: {reactionId: params.reactionId}}
        },
        {
            new: true
        })
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch( err => res.json(err))
    },


    removeThought({params}, res){
        // updating the thought document
        Thought.findOneAndDelete({ _id: params.thoughtId})
        .then(deletedThought => {
            if(!deletedThought){
                res.status(404).json({message: "no thought found on this user to delete"})
                return
            }
            return User.findOneAndUpdate(
                {
                    _id: params.userId
                },
                {
                    $pull: { thoughts: params.thoughtId}
                },
                {
                    new: true
                }
            );
        })
        .then((dbUserData) => {
            if(!dbUserData){
                res.status(404).json({message: "no user found with this id to delete comment"})
            }
            // else return the updated user data in res.json format
            res.json(dbUserData)
        })
        .catch( err => res.json(err))
    }
}

module.exports = thoughtsController