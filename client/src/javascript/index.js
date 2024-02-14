import { Workbox } from 'workbox-window';

/* This file was to attempt to integrate the service worker/PWA functionality  
into the application.  We couldn't get that done in time but hope to in the future.*/
try{

    if ('serviceWorker' in navigator) {
    
        // register workbox service worker
        const workboxSW = new Workbox('../src-sw.js');
        console.log("registering service worker");
        workboxSW.register();
        console.log("service worker registered");


    } else {

        console.error('Service workers are not supported in this browser.');
    }

} catch(error){

    console.log(error)
}