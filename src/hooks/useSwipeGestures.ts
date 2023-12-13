import {useCallback, useEffect, useRef} from "preact/hooks";

interface SwipeGestureCallbacks {
    handleLeftSwipe: () => void
    handleRightSwipe: () => void
    handleUpSwipe: () => void
    handleDownSwipe: () => void
}

/**
 * Calls the associated callbacks when a swipe is registered.
 * Based off of this stack overflow post: https://stackoverflow.com/a/23230280
 * @param callbacks - Function called when a swipe occurs 
 */
export const useSwipeGestures = (callbacks: SwipeGestureCallbacks) => {
    const xDown = useRef<number|null>(null)
    const yDown = useRef<number|null>(null)
    const resetCoords = () => {
        xDown.current = null;
        yDown.current = null;
    }

    const handleTouchStart = useCallback((event: TouchEvent) => {
        // ignore zoom touches
        if (event.touches.length > 1) return resetCoords();

        const firstTouch = event.touches[0];
        xDown.current = firstTouch.clientX;
        yDown.current = firstTouch.clientY;
    }, []);

    const handleTouchEnd = useCallback((event: TouchEvent) => {
        if (event.changedTouches.length > 1) return resetCoords();

        const xUp = event.changedTouches[0].clientX;
        const yUp = event.changedTouches[0].clientY;

        if ( !xDown.current || !yDown.current ) return resetCoords();
        const xDiff = xDown.current - xUp;
        const yDiff = yDown.current - yUp;

        const swipeThreshold = 50;
        if (Math.abs(xDiff) < swipeThreshold && Math.abs(yDiff) < swipeThreshold) return resetCoords();

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                callbacks.handleLeftSwipe();
            } else {
                callbacks.handleRightSwipe();
            }
        } else {
            if ( yDiff > 0 ) {
                callbacks.handleUpSwipe();
            } else {
                callbacks.handleDownSwipe();
            }
        }
        /* reset values */
        resetCoords();
    }, [callbacks.handleDownSwipe, callbacks.handleUpSwipe, callbacks.handleLeftSwipe, callbacks.handleRightSwipe]);

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        }
    }, [handleTouchStart, handleTouchEnd])
}