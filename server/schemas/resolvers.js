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
    
        checkout: async (parent, {project, paymentAmount}, context) => {

            console.log("stripe test");

            const url = new URL(context.headers.referer).origin;

            console.log("url", url)

            const line_items = [];

            console.log("id", project.id);
            console.log("name", project.name);
            console.log("description", project.description);

                const backableProject = await stripe.products.create({

                    name: project.name,
                    description: project.description,
                });
            

            console.log("backable project");

            if(stripe.products.list()){

                
            }

            const price = await stripe.prices.create({

                product: backableProject.id,
                unit_amount: paymentAmount * 100,
                currency: 'usd'
            })

            console.log("price", price)

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

            console.log("session", session)

            console.log("url", session.url)
            console.log("type", typeof session.url)

            return  {
                        session: session.id,
                        url: session.url
                    };
        }
    },

    Mutation: {

        addUser: async (parent, {username, email, password}) => {

            console.log("Inside!!");
            try{

                if(password.trim().length >= 8){

                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    password = hashedPassword

                    const user = await User.create({username, email, password});
                        
                    console.log("user", user);
        
                    const token = signToken(user);
        
                    return { token, user };
                
                } else {

                    return new ApolloError('Your password must be a length of 8 characters or more.')
                }

                
            }

            catch(error) {

                console.log("message", error.message);

                if(error.message.includes("duplicate key")){

                    return new ApolloError('The username or email address you entered is in use.', 'USER_CREATION_FAILED');
                
                } else {

                    return new ApolloError('Something went wrong with the sign up process.')
                }

                
                
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

            console.log("testings1234");

            if (context.user) {

                const newProject = await Project.create({

                    name: params.name,
                    description: params.description,
                    fundingGoal: params.fundingGoal,
                    currentFundingAmount: 0,
                    timePeriod: params.timePeriod
                });

                console.log("newProject", newProject);

                let updatedUser = await User.findOneAndUpdate(

                    { _id: context.user._id },
                    { $addToSet: { projects: newProject._id } }
                );

                console.log("updatedUser", updatedUser);

                return {

                    project: newProject,
                    user: updatedUser
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

        removeProject: async (parent, {projectId}, context) => {

            try{

                console.log("user context", context.user);
                console.log("projectId", projectId)

                console.log("test")

                if (context.user) {

                    

                    const removedProject = await Project.findOneAndDelete({
    
                        _id: projectId,
                    });

                    console.log("removed project", removedProject)
    
                    const updatedUser = await User.findOneAndUpdate(
    
                        { _id: context.user._id },
                        { $pull: { projects: removedProject._id } },
                        { new: true }
                    );

                    console.log("updated user", updatedUser)
    
                    return {
    
                        user: updatedUser,
                        project: removedProject,
                    };
                
                } else {
    
                    throw AuthenticationError();
                }
            
            } catch (error){

                console.log(JSON.stringify(error));
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
            
        },

        updateProjectFunds: async (parent, {projectId, fundChangeAmount}, context) => {

            console.log("test");
            console.log("fund change amount", fundChangeAmount)

            console.log("projectId", projectId);

            try{

                // if(context.user){

                    let projectInQuestion = await Project.findOne(
                        {
                            _id: projectId
                        }
                    )
                    console.log("projectInQuestion", projectInQuestion)
                    projectInQuestion.currentFundingAmount += fundChangeAmount;
                    await projectInQuestion.save();
                    console.log("projectInQuestion2", projectInQuestion)
                    return projectInQuestion;
                //}
            
            } catch (error){

                console.log("error", error);
            }

            
        }
    }
};

module.exports = resolvers;
