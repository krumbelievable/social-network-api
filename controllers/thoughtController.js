const { Thought, User } = require('../models'); // require the Thought and User models

module.exports = {  // below we use our routes that we created in our api Folder. 

  getThoughts(req, res) {  // This is to pull all of the thoughts we have.
    Thought.find()
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) { // this is to pull a single thought.
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) { // This is to create a thought.
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          {_id: req.body.userId},
          { $push: { thoughts: _id }},
          {new: true}
        )
      })
      .then(userData => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {  // This is to delete a thought.
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) { // this is to update a thought.
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) { //This is to add a reaction to a thought.
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push:{ reactions: req.body }},
      { runValidators: true, new: true }
    )
    .then(thoughtData => res.json(thoughtData))
    .catch(err => {
      console.log(err)
      res.status(404).json(err);
    })
  },

  removeReaction(req, res) {  //This is to delete a reaction to a thought. 
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull:{ reactions: req.params.reactionId }},
      { runValidators: true, new: true }
    )
    .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message: 'Error!',
            })
          : res.json({ message: 'Reaction removed!' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
