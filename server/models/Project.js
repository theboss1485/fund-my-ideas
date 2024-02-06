const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema(

    {
        name: {

            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        },

        // fixed the previous one that I messed up
        username: {
            type: String,
            required: true
        },

        description: {

            type: String,
            required: true,
            minlength: 1,
            maxlength: 350
        },

        createdAt: {

            type: Date,
            default: Date.now,
        },

        fundingGoal: {

            type: Number,
            required: true
        },

        timePeriod: {

            type: Number,
            required: true
        },

        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

projectSchema.virtual('commentCount').get(function() {
    return this.comments.length;
})

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;