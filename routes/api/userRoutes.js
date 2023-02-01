const router = require('express').Router();
const {  // here are all of the user and friend routes that we will be calling in our controller.
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
  addToFriendList,
  removeFromFriendList,
} = require('../../controllers/userController');

// /users

router
.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

// /api/users/:userId/friends/friendId
router
.route('/:userId/friends/:friendId')
.post(addToFriendList);

// /api/users/:user/friends/friendId
router
.route('/:userId/friends/:friendId')
.delete(removeFromFriendList);

module.exports = router;
