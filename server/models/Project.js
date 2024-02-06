const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(

    {
        name: {

            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
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
        }
    }
)

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;