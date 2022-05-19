const { Schema, model, Types} = require('mongoose')


// create schema for user
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            // trimmed set to true
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [UserSchema]
    }
)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

// required email validator?
// const User = db.model('User', UserSchema)
// const user = new UserSchema();

// let error;
// try {
//   await user.save();
// } catch (err) {
//   error = err;
// }
    
// assert.equal(error.errors['email'].message,
//   'Path `name` is required.');

// error = cat.validateSync();
// assert.equal(error.errors['email'].message,
//   'Path `email` is required.');

const User = model('User', UserSchema)

module.exports = User;