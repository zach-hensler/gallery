import { FunctionalComponent } from "preact";
import {useCallback, useEffect, useRef, useState} from "preact/hooks";

interface ImageProps {
    src: string,
    alt: string
}

type LoadingColors = "red"|"green"|"blue";
const getLoadingColor = (): LoadingColors => {
    const randInt = Math.floor(Math.random() * 3);
    console.log(randInt)
    switch (randInt) {
        case 0:
            return "red";
        case 1:
            return "green";
        case 2:
            return "blue";
        default:
            console.error(`Unexpected int, received: ${randInt}`);
            return "blue";
    }
};

export const Image: FunctionalComponent<ImageProps> = ({src, alt}) => {
    const [onScreen, setOnScreen] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const [loadingColor] = useState<LoadingColors>(getLoadingColor())
    const containerRef = useRef<HTMLDivElement>(null);

    const handleLazyLoading = useCallback(() => {
        if (onScreen) return;

        const clientRect = containerRef.current?.getBoundingClientRect();
        if (!clientRect) return;``
        if (clientRect.y > window.scrollY + window.innerHeight) return;

        setOnScreen(true);
    }, [])

    useEffect(() => {
        const scrollEventName = "scroll";
        handleLazyLoading();
        document.addEventListener(scrollEventName, handleLazyLoading);
        return () => document.removeEventListener(scrollEventName, handleLazyLoading);
    }, [handleLazyLoading]);

    const loadingPlaceholder = <div className={`loading-image ${loadingColor}`} ref={containerRef}></div>;

    if (!onScreen) return loadingPlaceholder;
    return hasLoaded
        ? <img src={src} alt={alt} loading="lazy"/>
        : <>
            <img className="is-hidden" onLoad={() => setHasLoaded(true)} src={src} alt={alt} loading="lazy"/>
            {loadingPlaceholder}
        </>
};
