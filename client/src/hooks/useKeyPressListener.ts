import { useEffect } from 'react';

export function useKeyPressListener(handler: any) {
    
    useEffect(() => {
        // Add event listener to window
        window.addEventListener('keypress', handler);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('keypress', handler);
        }
    });
    
}
