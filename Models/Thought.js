const { Schema, model, Types } = require('mongoose')
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
    // set a custom id to avoid confusion with parent "thoughtSchema"
    reactionId: {
        // _id is self generated 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    }
},
{
    toJSON: {
        getters: true
    }
}
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            // (The user that created this thought)
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const Thought = model("Thought", ThoughtSchema)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

module.exports = Thought