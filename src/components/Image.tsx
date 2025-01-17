import { FunctionalComponent } from "preact";
import {useRef, useState} from "preact/hooks";

interface ImageProps {
    src: string,
    alt: string
}

type LoadingColors = "red"|"green"|"blue";
const getLoadingColor = (): LoadingColors => {
    const randInt = Math.floor(Math.random() * 3);
    switch (randInt) {
        case 0:
            return "red";
        case 1:
            return "green";
        case 2:
            return "blue";
        default:
            console.error(`Unexpected int value, received: ${randInt}`);
            return "blue";
    }
};

export const Image: FunctionalComponent<ImageProps> = ({src, alt}) => {
    // const [onScreen, setOnScreen] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(true);
    const [loadingColor] = useState<LoadingColors>(getLoadingColor())
    const containerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const scrollEventName = "scroll";
    //     const handleLazyLoading = () => {
    //         if (onScreen || hasLoaded) return;
    //
    //         const clientRect = containerRef.current?.getBoundingClientRect();
    //         if (!clientRect) return;
    //         if (clientRect.y > window.scrollY + window.innerHeight) return;
    //
    //         setOnScreen(true);
    //         document.removeEventListener(scrollEventName, handleLazyLoading)
    //     }
    //     handleLazyLoading();
    //     document.addEventListener(scrollEventName, handleLazyLoading);
    //     return () => document.removeEventListener(scrollEventName, handleLazyLoading);
    // }, []);

    const loadingPlaceholder = <div className={`loading-image ${loadingColor}`} ref={containerRef}></div>;

    // if (!onScreen) return loadingPlaceholder;
    return hasLoaded
        ? <img src={src} alt={alt} loading="lazy"/>
        : <>
            <img className="is-hidden" onLoad={() => setHasLoaded(true)} src={src} alt={alt} loading="lazy"/>
            {loadingPlaceholder}
        </>
};
