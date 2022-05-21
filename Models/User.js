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
            unique: true,
            match: [/.+\@.+\..+/, "must be an email format"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    }
)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('User', UserSchema)

module.exports = User;