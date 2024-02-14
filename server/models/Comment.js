const mongoose = require('mongoose');
const { Schema } = mongoose;
const formatDate = require('../utils/format-date.js');

// This is the schema for comments for each project in the MogoDB, for this application.
const commentSchema = new mongoose.Schema(
    
    {
        commentText: {type: String, 
                      required: true,
                      minlength: 1,
                      maxLength: 280},

        // The Xpert Learning Assistant AI told me how to format the date.
        createdAt: {type: Date,
                    default: Date.now,
                },

        username: {type: String,
                   required: true
                },
    }, 
    {
        toJSON: {

            getters: true
        },
        id: false,
    }
);

// This virtual method calls the method to format the date when a comment was created.
commentSchema.virtual('createdAtFormatted').get(function(){

    return formatDate(this.createdAt);
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;