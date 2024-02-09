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