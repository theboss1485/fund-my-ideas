const db = require('../config/connection');
const { Project, User, Comment } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

db.once('open', async() => {
    await cleanDB('User', 'users');
    await cleanDB('Project', 'projects');
    await cleanDB('Comment', 'comments');
    // Villy: Module 14 mini project reference?
    
    // Villy: Can delete "username" in both projectData and commentData to allow for randomization
    console.log('Database seeded!');
    process.exit(0);
})

