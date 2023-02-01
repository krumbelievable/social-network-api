const { Schema, model } = require('mongoose');


const userSchema = new Schema( // Our User schema.
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email adress.'] // This uses a regex to help match an email. 
    },
    thoughts:[ 
    {
      type: Schema.Types.ObjectId, // calls the thoughts that will be kept with the User.
      ref:'Thought'
    },
  ],
    friends: [
        { 
            type: Schema.Types.ObjectId, //calls the friends for the user.
            ref: 'User',
        } 
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () { // This is our virtual we create to keep track of the number of friends we will have.
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;
