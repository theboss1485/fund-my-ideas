const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const { Project, User, Comment } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

const bcrypt = require('bcrypt');


/* This file calls the funtion to clear the database of data.
It then seeds the database and randomizes which projects below to 
which users and which comments belong to which projects.*/
db.once('open', async() => {
    await cleanDB('User', 'users');
    await cleanDB('Project', 'projects');
    await cleanDB('Comment', 'comments');
    // Villy: Module 14 mini project reference?

    let projects = [];
    let users = [];

    try{

        console.log("object Id", new ObjectId());

        let comments = await Comment.insertMany(commentData);

        console.log('Comments seeded!');

        for (const project of projectData){

            let randomCommentIndex = Math.floor(Math.random() * comments.length);
            let projectCommentId = comments[randomCommentIndex]._id;
            comments.splice(randomCommentIndex, 1);

            let seededProject = await Project.create({

                ...project,
                comments: [projectCommentId]
            });

            projects.push(seededProject)
        }

        console.log('Projects seeded!');

        for (const user of userData){

            let randomProjectIndex = Math.floor(Math.random() * projects.length);
            let userProjectId = projects[randomProjectIndex]._id;
            projects.splice(randomProjectIndex, 1);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword

            let seededUser = await User.create({

                ...user,
                projects: [userProjectId]
            })

            users.push(seededUser)
        }

        console.log('Users seeded!');
        console.log('Database seeding complete!');
    
    } catch (error) {

        console.log(error)
    }

    // Villy: Can delete "username" in both projectData and commentData to allow for randomization
    
    process.exit(0);
})

