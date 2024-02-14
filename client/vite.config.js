import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* This function initializes the server to run on port 3000, and the client on port 3001*/
export default defineConfig({

    plugins: [react()],

    server: {

        port: 3000,
        open: true,

        proxy: {

            '/graphql': {
                
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            },     
        }
    }
})
