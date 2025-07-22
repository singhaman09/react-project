import {
  init,
  setKeyMap,
  setThrottle,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";

export const initSpatialNavigation = () => {
  // Initialize with optimal settings
  init({
    debug: true,
    visualDebug: true,
    shouldFocusInputOnEnter: false,
    shouldUseNativeEvents: true,
  });

  // Detect platform for optimized configuration
  const isWebOS = navigator.userAgent.includes('Web0S') || 
                  navigator.userAgent.includes('webOS') || 
                  typeof window.PalmSystem !== 'undefined';
  
  const isTizen = navigator.userAgent.includes('Tizen') || 
                  typeof window.tizen !== 'undefined';
  
  const isTV = isWebOS || isTizen;

  // Base key mapping that works everywhere
  const baseKeyMap = {
    left: ["ArrowLeft", "37"],
    right: ["ArrowRight", "39"],
    up: ["ArrowUp", "38"],
    down: ["ArrowDown", "40"],
    enter: ["Enter", "13", " "],
  };

  // Extended key mapping for TV platforms
  const tvKeyMap = {
    ...baseKeyMap,
    back: ["Escape", "27", "461"], // WebOS back button
    home: ["36"],
    menu: ["93"],
    // Colored buttons for interactive TV apps
    red: ["403"],
    green: ["404"],
    yellow: ["405"],
    blue: ["406"],
  };

  // Use appropriate key mapping
  setKeyMap(isTV ? tvKeyMap : baseKeyMap);

  // Optimize throttling for platform
  setThrottle(isTV ? 50 : 100);

  // Enhanced key event handler
  const handleKeyDown = (event) => {
    console.log('Key event:', {
      key: event.key,
      keyCode: event.keyCode,
      platform: isWebOS ? 'WebOS' : isTizen ? 'Tizen' : 'Web'
    });

    // Prevent default for navigation keys
    const navKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'];
    if (navKeys.includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Handle TV-specific keys
    if (isTV) {
      switch (event.keyCode) {
        case 461: // WebOS back
        case 27:  // Escape
          event.preventDefault();
          handleBackButton();
          break;
      }
    }
  };

  // Back button handler
  const handleBackButton = () => {
    // Custom back logic - can be overridden
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  // Add event listener
  document.addEventListener('keydown', handleKeyDown, { capture: true });

  // Platform-specific initialization
  if (isWebOS) {
    initWebOS();
  } else if (isTizen) {
    initTizen();
  }

  // Cleanup function
  const cleanup = () => {
    document.removeEventListener('keydown', handleKeyDown, { capture: true });
  };

  // Store cleanup reference
  window.spatialNavCleanup = cleanup;

  // Set initial focus with delay
  setTimeout(() => {
    setFocus("login-email");
  }, 300);

  return { cleanup, isTV, platform: isWebOS ? 'webos' : isTizen ? 'tizen' : 'web' };
};

// WebOS specific initialization
const initWebOS = () => {
  console.log('Initializing WebOS optimizations');
  
  // Hide hardware cursor
  if (window.PalmSystem?.cursor) {
    window.PalmSystem.cursor.hide();
  }

  // Disable virtual keyboard
  if (window.webOSSystem?.keyboard) {
    window.webOSSystem.keyboard.setKeyboardVisibility(false);
  }
};

// Samsung Tizen specific initialization
const initTizen = () => {
  console.log('Initializing Tizen optimizations');
  
  try {
    if (window.tizen?.tvinputdevice) {
      const supportedKeys = [
        'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue',
        'MediaPlayPause', 'MediaStop', 'VolumeUp', 'VolumeDown'
      ];
      window.tizen.tvinputdevice.registerKeyBatch(supportedKeys);
    }
  } catch (error) {
    console.warn('Failed to register Tizen keys:', error);
  }
};

// Utility function for programmatic focus changes
export const setTVFocus = (focusKey, delay = 100) => {
  setTimeout(() => {
    setFocus(focusKey);
  }, delay);
};

// Hook for custom back button handling
export const setBackButtonHandler = (handler) => {
  window.customBackHandler = handler;
};


window.__SPATIAL_NAVIGATION__.setFocus("login-password");


