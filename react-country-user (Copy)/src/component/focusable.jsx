import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect, useRef } from "react";

// Enhanced Focusable wrapper with better TV remote support
function Focusable({ onEnterPress, children, focusKey, onClick, className = "" }) {
  const nodeRef = useRef(null);
  
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress,
    onFocus: () => {
      console.log(`Focused on: ${focusKey}`);
    },
    onBlur: () => {
      console.log(`Blurred from: ${focusKey}`);
    },
    // Ensure the component has proper coordinates
    extraProps: {
      onFocus: () => {
        if (nodeRef.current) {
          nodeRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }
  });

  // Combine refs
  const combinedRef = (node) => {
    nodeRef.current = node;
    if (ref) ref.current = node;
  };

  // Enhanced keyboard handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (focused && event.key === 'Enter') {
        event.preventDefault();
        if (onEnterPress) onEnterPress();
        if (onClick) onClick();
      }
    };

    if (nodeRef.current) {
      nodeRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        if (nodeRef.current) {
          nodeRef.current.removeEventListener('keydown', handleKeyDown);
        }
      };
    }
  }, [focused, onEnterPress, onClick]);

  return (
    <div 
      ref={combinedRef}
      tabIndex={focused ? 0 : -1}
      onClick={onClick}
      className={`${className} ${focused ? 'focused' : ''}`}
      style={{
        outline: focused ? '2px solid #3b82f6' : 'none',
        outlineOffset: '2px'
      }}
    >
      {children(focused, { ref: combinedRef })}
    </div>
  );
}

export default Focusable;