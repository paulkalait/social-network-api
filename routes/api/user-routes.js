const router = require('express').Router()
const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteFriend
} = require('../../controllers/user-controller')

// set up the get and post at /api/users
router.route('/').get(getAllUsers).post(createUser)

router.route('/:userId/:friendsId').put(deleteFriend)

// set up a GET, PUT, and DELETE for *ONE User
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router