const { User } = require('../models'); // Here we call our User model. 


module.exports = {  // here we use the routes we created for User.

  getUsers(req, res) { // This is to get all users.
    User.find({})
      .select("-__v")
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err)
        res.status(404).json(err);
      })
  },

  getSingleUser(req, res) { // This is to get a single user. 
    User.findOne({ _id: req.params.userId})
      .select('-__v')
      .lean()
      .then( (userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({userData})
      )
      .catch((err) => {
        console.log(err);
         res.status(500).json(err);
      });
  },

  createUser(req, res) { // This is used to create a user. 
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) { // This is to update a user. 
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body ,
      { runValidators: true, new: true }
    )
      .then(userData => {
        if(!userData) {
          res.status(404).json({message: 'User not found!'})
          return;
        }
        res.json(userData)
      })
      
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  deleteUser(req, res) { // This is to delete a user. 
    User.findOneAndRemove({ _id: req.params.userId })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  addToFriendList(req, res) { // This is to add a user to another users friend. 
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {friends: req.params.friendId}},
      {runValidators: true, new: true}
    )
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err)
      res.status(404).json(err);
    })
  },

  removeFromFriendList(req, res) { // This is to remove another user from friendlist. 
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: {friends: req.params.friendId}},
      {runValidators: true, new: true}
    )
    .then((userData) =>
        !userData
          ? res.status(404).json({
              message: 'Error!',
            })
          : res.json({ message: 'Friend removed from list!' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

