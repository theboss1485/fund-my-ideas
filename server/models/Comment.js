const mongoose = require('mongoose');
const formatDate = require('../utils/format-date.js')
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

        createdAt: {type: Date,

            default: Date.now,
        }

    }, 
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

commentSchema.virtual('createdAtFormatted').get(function(){

    return formatDate(this.createdAt);
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;