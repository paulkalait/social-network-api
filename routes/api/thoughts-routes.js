const router = require('express').Router();
const { addThought, addReaction, removeReaction,  removeThought} = require('../../controllers/thoughts-controller')

// post one thought
router.route('/:userId').post(addThought)

// delete one though


router.route('/:userId/:thoughtId').put(addReaction).delete(removeThought)

// api/user/thoughts/reactions/ > delete reaction
router.route('/:userId/:thoughtId/:reactionId').put(removeReaction)

module.exports = router 