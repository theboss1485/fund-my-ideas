const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new mongoose.Schema(

    {
        username: {

            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        },

        email: {
            type: String,
            required: true,
            validator: (value) => {

                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
            },
            
            message: "You have entered an invalid email address.  Email addresses must be entered in the format test@example.com."
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
          },

        createdAt: {

            type: Date,
            default: Date.now,
        },

        projects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Project'
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

userSchema.virtual('projectCount').get(function() {
    return this.projects.length;
})

const User = mongoose.model("User", userSchema);

module.exports = User;