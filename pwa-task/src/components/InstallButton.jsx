import { useState, useEffect } from 'react';

function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Store the install prompt event when it's fired
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Check if the app is already installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Clear the saved prompt as it can't be used again
    setInstallPrompt(null);
  };

  if (isInstalled) {
    return <div className="install-message">App successfully installed!</div>;
  }

  if (!installPrompt) {
    return null;
  }

  return (
    <button className="install-button" onClick={handleInstallClick}>
      Install App
    </button>
  );
}

export default InstallButton;