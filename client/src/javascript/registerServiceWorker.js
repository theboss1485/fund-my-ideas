/* This file was to attempt to integrate the service worker/PWA functionality  
into the application.  We couldn't get that done in time but hope to in the future.*/
export const registerSW = () => {
    
    if ('serviceWorker' in navigator) {
      
        window.addEventListener('load', () => {
            
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
};
  