/* This file was to attempt to integrate the service worker/PWA functionality  
into the application.  It was supposed to be a function to handle
the installation of the PWA.
We couldn't get that done in time but hope to in the future.*/
export default handleInstall = () => {

    if (deferredPrompt) {

        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {

            if (choiceResult.outcome === 'accepted') {

                console.log('User accepted the install prompt');
            
            } else {

                console.log('User dismissed the install prompt');
            }

            setDeferredPrompt(null);
            setIsInstallable(false);
        });
    }
};