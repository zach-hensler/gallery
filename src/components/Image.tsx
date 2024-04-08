import { FunctionalComponent } from "preact";
import {useCallback, useEffect, useRef, useState} from "preact/hooks";

interface ImageProps {
    src: string,
    alt: string
}

export const Image: FunctionalComponent<ImageProps> = ({src, alt}) => {
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleLazyLoading = useCallback(() => {
        if (hasLoaded) return;

        const clientRect = containerRef.current?.getBoundingClientRect();
        if (!clientRect) return;
        if (clientRect.y > window.scrollY + window.innerHeight) return;

        setHasLoaded(true);
    }, [])

    useEffect(() => {
        const scrollEventName = "scroll";
        handleLazyLoading();
        document.addEventListener(scrollEventName, handleLazyLoading);
        return () => document.removeEventListener(scrollEventName, handleLazyLoading);
    }, [handleLazyLoading]);

    return hasLoaded
        ? <img src={src} alt={alt} loading="lazy"/>
        : <div ref={containerRef}></div>;
};
