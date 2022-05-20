const router = require('express').Router()
const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller')

// set up the get and post at /api/users
router.get('/').get(getAllUsers).post(createUser)


// set up a GET, PUT, and DELETE for *ONE User
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router