const { User, Comment, Project } = require('../models');
const { signToken, AuthenticationError, getProfile } = require('../utils/auth');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

const formatDate = require('../utils/format-date');

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

        allProjects: async () => {

            let projects = await Project.find().sort({ fundingGoal: -1 })
            return projects
        },

        projectsByUsername: async (parent, { username }) => {

            const params = username ? { username } : {};

            let user = await User.findOne({username: params.username}).populate('projects').populate({

                path: 'projects',
                populate: 'comments'
            })

            console.log("user", user)
            return user.projects;
            
            
        },

        projectById: async (parent, { projectId }) => {

            const params = projectId ? { projectId } : {};

            let project = await Project.findOne({_id: params.projectId}).populate('comments');
           
            const populatedProject = project.toObject();
            populatedProject.comments.forEach((comment) => {
                comment.createdAt = formatDate(comment.createdAt);
            });

            return populatedProject;

        },
    
        // addComment: async (_, {projectId, commentText}) => {

        //     let newComment = await Comment.create({commentText});

        //     let updatedProject = Project.findByIdAndUpdate(projectId,

        //         { $push: { comments: { _id: newComment._id } } },
        //         { new: true },
                
        //         (err, updatedProject) => {
                
        //             if (err) {
                        
        //                 console.log(err);
                    
        //             } else {
                        
        //                 return updatedProject
        //             }
        //         }
        //     )

        //     return {comment: newComment, project: updatedProject}
        // },

        // deleteComment: async (parent, {projectId, commentId}) => {

        //     let deletedComment = Project.findOneAndDelete({_id: commentId});

        //    let updatedProject = Project.findByIdAndUpdate(projectId,

        //         { $pull: { comments: { _id: commentId } } },
        //         { new: true },
                
        //         (err, updatedProject) => {
                
        //             if (err) {
                        
        //                 console.log(err);
                    
        //             } else {
                        
        //                 return updatedProject
        //             }
        //         }
        //     )

        //     return {deletedComment, updatedProject}
        // }
    },

    Mutation: {

        addUser: async (parent, {username, email, password}) => {

            console.log("Inside!!");
            try{

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                password = hashedPassword

                const user = await User.create({username, email, password});
    
                console.log("user", user);
    
                const token = signToken(user);
    
                return { token, user };
            }

            catch(error) {

                console.log("error", error)
            } 


        },

        login: async (parent, {email, password}) => {

            console.log("test!!!")

            const user = await User.findOne({email: email});

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
        
        addComment: async (parent, {projectId, commentText}, context) => {
    
            if (context.user) {

                let newComment = await Comment.create({

                    commentText: commentText,
                    username: context.user.username
                })

                

                let updatedProject = await Project.findByIdAndUpdate(projectId,

                    { $push: { comments: newComment._id } },
                    { new: true },
                    
                )

                await updatedProject.save()

                return {

                    comment: newComment,
                    project: updatedProject
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

        removeComment: async (parent, {projectId, commentId}, context) => {

            console.log("test");

            if (context.user) {

                let removedComment = await Comment.findOneAndDelete(

                    {
                        _id: commentId
                    }
                )

                console.log("removed comment", removedComment)

                console.log("removed comment id", removedComment._id)

                let updatedProject = await Project.findByIdAndUpdate(projectId,

                    { $pull: { comments: removedComment._id } },
                    { new: true }
                    
                );

                

                console.log("updated project", updatedProject)

                await updatedProject.save()

                return {

                    comment: removedComment,
                    project: updatedProject
                }

            } else {

                throw AuthenticationError;
            }
            
        }
    }
};

module.exports = resolvers;
