const express = require('express');
require('dotenv').config()
const { ApolloServer } = require('@apollo/server');
const path = require('path');
const db = require('./config/connection');
const { expressMiddleware } = require('@apollo/server/express4');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;

/* This file initializes and starts up the ApolloServer for the application. */
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// I took code for this method from activity 14 of Module 21.
const startApolloServer = async () => {
  
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));

    // if we're in production, we serve client/build as static assets
    if (process.env.NODE_ENV === 'production') {

        app.use(express.static(path.join(__dirname, '../client/dist')));
    
        app.get('*', (req, res) => {

            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    // Here, we perform actions once the database is connected.
    db.once('open', () => {
        
        console.log("Database Connected");
        app.listen(PORT, () => {

            console.log(`🌍 Now listening on localhost:${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
}

startApolloServer();






