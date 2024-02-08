const { User, Comment, Project } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');

const resolvers = {
    
    Query: {

        me: async (parent, args, context) => {

            if (context.user) {
                
                return User.findOne({ _id: context.user._id }).populate('projects').populate({

                    path: 'projects',
                    populate: 'comments'
                });
            }

            throw AuthenticationError;
        },

        user: async (parent, { username }) => {

            const params = username ? { username } : {};

            return User.findOne(params).populate('projects').populate({

                path: 'projects',
                populate: 'comments'
            });;
        },

        projects: async (parent, { username }) => {

            const params = username ? { username } : {};

            let user = await User.findOne(params).populate('projects').populate({

                path: 'projects',
                populate: 'comments'
            })

            console.log("user", user)
            return user.projects;
            
            
        },

        project: async (parent, { _id }) => {

            //_id = new ObjectId(_id);
            console.log("projectId", _id);

            const params = _id ? { _id } : {};

            let project = await Project.findOne(params).populate('comments');
            console.log("project", project);
            return project;
        },
        
        comments: async (parent, { _id }) => {

            const params = _id ? { _id } : {};

            let projectInQuestion = await Project.findOne(params).populate('comments');

            return projectInQuestion.comments
        }
    },

    Mutation: {

        
        addUser: async (parent, {username, email, password}) => {

            try{

                console.log("params", args);

                const user = await User.create({username, email, password});
    
                console.log("user", user);
    
                const token = signToken(user);
    
                return { token, user };
            }

            catch(error) {

                
            } 


        },

        login: async (parent, args) => {

            console.log("test!!!")

            const user = await User.findOne({

                email: args.email
            });

            if (!user) {

                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {

                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        addProject: async (parent, params , context) => {

            if (context.user) {

                const newProject = await Project.create({

                    name: params.name,
                    description: params.description,
                    fundingGoal: params.fundingGoal,
                    timePeriod: params.timePeriod
                });

                let updatedUser = await User.findOneAndUpdate(

                    { _id: context.user._id },
                    { $addToSet: { projects: project._id } }
                );

                return {

                    newProject: newProject,
                    updatedUser: updatedUser
                };
            } else {

                throw AuthenticationError;
            }
        },
        
        addComment: async (parent, params, context) => {
        
            if (context.user) {

                let newComment = Comment.create({

                    commentText: params.commentText,
                    username: context.user.username
                })

                let updatedProject =  Project.findOneAndUpdate(

                    { _id: params.projectId },
                    {
                        $addToSet: {

                            comments: { commentText, username: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                return {

                    newComment: newComment,
                    updatedProject: updatedProject
                }

            } else {

                throw AuthenticationError;
            }
        },

        removeProject: async (parent, params, context) => {

            if (context.user) {

                const removedProject = await Project.findOneAndDelete({

                    _id: params.projectId,
                });

                const updatedUser = await User.findOneAndUpdate(

                    { _id: context.user._id },
                    { $pull: { projects: removedProject._id } }
                );

                return {

                    removedProject: removedProject,
                    updatedUser: updatedUser
                };
            
            } else {

                throw AuthenticationError();
            }

            
        },

        removeComment: async (parent, params, context) => {

            if (context.user) {

                const removedComment = await Comment.findOneAndDelete(

                    {
                        _id: params.commentId
                    }
                )

                const updatedProject = await Project.findOneAndUpdate(

                    { _id: params.projectId },
                    {
                        $pull: {
                            
                            comments: {
                                
                                _id: params.commentId,
                                commentAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );

                return {

                    removedComment: removedComment,
                    updatedProject: updatedProject
                }

            } else {

                throw AuthenticationError;
            }
            
        }
    }
};

module.exports = resolvers;
