const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment/moment');

const thoughtSchema = new Schema(  //The schema for the Thought Model.
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 180,
    },
    createdAt: {
      type: Date,  // moments.js used for timestamp. 
      default: Date.now,
      get: dateStamp => moment(dateStamp).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema] // pulling our reactionSchema into our thoughtSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function (){ // This is our virtual we create to keep track of the number of reactions we will have. 
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;