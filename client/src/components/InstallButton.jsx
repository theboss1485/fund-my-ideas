import installScript from '../javascript/install'
/* This component was meant to be used for installing the application as a PWA.
We didn't quite get this implemented but would like to implement it in the future.*/
const InstallButton = () => {

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {

        const handleBeforeInstallPrompt = (event) => {

            event.preventDefault();
            setDeferredPrompt(event);
            setIsInstallable(true);
        };
    
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
        return () => {

            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };

    }, []);

    return (

        <div>
            {isInstallable && (
                
                <button onClick={installScript}>Install</button>
            )}
        </div>
    )
}

export default InstallButton;