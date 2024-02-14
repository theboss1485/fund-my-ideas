require('dotenv').config()
const { User, Comment, Project } = require('../models');
const { signToken, AuthenticationError, getProfile } = require('../utils/auth');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-errors');

const formatDate = require('../utils/format-date');

const resolvers = {
    
    Query: {

        // This method contains the logic for getting the logged in user from the database.
        me: async (parent, args, context) => {

            if (context.user) {
                
                return User.findOne({ _id: context.user._id }).populate('projects').populate({

                    path: 'projects',
                    populate: 'comments'
                });
            }

            throw AuthenticationError;
        },

        // This method gets a single user and its projects by username.
        // user: async (parent, { username }) => {

        //     const params = username ? { username } : {};

        //     return User.findOne(params).populate('projects').populate({

        //         path: 'projects',
        //         populate: 'comments'
        //     });;
        // },

        // This method gets all projects from the database.
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
    
        checkout: async (parent, {project, paymentAmount}, context) => {

            const url = new URL(context.headers.referer).origin;

            const line_items = [];

                const backableProject = await stripe.products.create({

                    name: project.name,
                    description: project.description,
                });
            


            if(stripe.products.list()){

                
            }

            const price = await stripe.prices.create({

                product: backableProject.id,
                unit_amount: paymentAmount * 100,
                currency: 'usd'
            })

            line_items.push({

                price: price.id,
                quantity: 1
            })

            const session = await stripe.checkout.sessions.create({

                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/paymentFailure`
            });

            return  {
                        session: session.id,
                        url: session.url
                    };
        }
    },

    Mutation: {

        // This resolver contains the logic for adding a user to the database.
        addUser: async (parent, {username, email, password}) => {

            username = username.trim();
            email = email.trim();

            try{

                if(password.trim().length >= 8){

                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    password = hashedPassword

                    const user = await User.create({username, email, password});
        
                    const token = signToken(user);
        
                    return { token, user };
                
                } else {

                    return new ApolloError('Your password must be a length of 8 characters or more.')
                }

                
            }

            catch(error) {

                /* If the database already contains the email address or username that the user is trying to 
                sign up with, the application throws an error message.*/
                if(error.message.includes("duplicate key")){

                    return new ApolloError('The username or email address you entered is in use.', 'USER_CREATION_FAILED');
                
                } else {

                    return new ApolloError('Something went wrong with the sign up process.')
                }

                
                
            } 


        },

        // This method contains the back-end logic for logging the user into the application.
        login: async (parent, {email, password}) => {

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

        // This method contains the logic for adding a project to the application.
        addProject: async (parent, params , context) => {

            if (context.user) {

                const newProject = await Project.create({

                    name: params.name,
                    description: params.description,
                    fundingGoal: params.fundingGoal,
                    currentFundingAmount: 0,
                    timePeriod: params.timePeriod
                });

                let updatedUser = await User.findOneAndUpdate(

                    { _id: context.user._id },
                    { $addToSet: { projects: newProject._id } }
                );

                return {

                    project: newProject,
                    user: updatedUser
                };

            } else {

                throw AuthenticationError;
            }
        },
        
        // This method contains the logic for adding a comment to a project.
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

        // This method contains the logic for removing a project from the application.
        removeProject: async (parent, {projectId}, context) => {

            try{

                if (context.user) {

                    

                    const removedProject = await Project.findOneAndDelete({
    
                        _id: projectId,
                    });
    
                    const updatedUser = await User.findOneAndUpdate(
    
                        { _id: context.user._id },
                        { $pull: { projects: removedProject._id } },
                        { new: true }
                    );
    
                    return {
    
                        user: updatedUser,
                        project: removedProject,
                    };
                
                } else {
    
                    throw AuthenticationError();
                }
            
            } catch (error){

                console.log(error);
            }
        },

        // This method contains the logic for removing a comment from the application.
        removeComment: async (parent, {projectId, commentId}, context) => {

            if (context.user) {

                let removedComment = await Comment.findOneAndDelete(

                    {
                        _id: commentId
                    }
                )

                let updatedProject = await Project.findByIdAndUpdate(projectId,

                    { $pull: { comments: removedComment._id } },
                    { new: true }
                );

                await updatedProject.save()

                return {

                    comment: removedComment,
                    project: updatedProject
                }

            } else {

                throw AuthenticationError;
            }
            
        },

        // This method contains the logic for updating the amont of money a project has.
        updateProjectFunds: async (parent, {projectId, fundChangeAmount}, context) => {

            try{

                // if(context.user){

                    let projectInQuestion = await Project.findOne(
                        {
                            _id: projectId
                        }
                    )

                    projectInQuestion.currentFundingAmount += fundChangeAmount;
                    await projectInQuestion.save();
                    return projectInQuestion;
                //}
            
            } catch (error){

                console.log("error", error);
            } 
        }
    }
};

module.exports = resolvers;
