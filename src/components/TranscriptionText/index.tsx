import React, { useEffect, useRef } from 'react';
import { TranscriptDetail } from '../../types';
import styles from './TranscriptionText.module.css';
import { debounce } from 'lodash';

interface TranscriptionTextProps {
    transcript: TranscriptDetail;
    currentTime: number;
    isHighlightingEnabled: boolean;
}

const TranscriptionText: React.FC<TranscriptionTextProps> = ({ transcript, currentTime, isHighlightingEnabled }) => {
    const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to top when transcript changes
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [transcript]);

    useEffect(() => {
        // handle non smooth scrolling when fast forwarding the video
        const debouncedScroll = debounce((index: number) => {
            if (wordRefs.current[index] && containerRef.current) {
                const wordElement = wordRefs.current[index];
                const containerElement = containerRef.current;

                const middlePosition = containerElement.offsetHeight / 2;
                if (wordElement) {
                    // Calculate scroll position to align word to middle of the container
                    const scrollPosition =
                        wordElement.offsetTop - containerElement.offsetTop - middlePosition +
                        (wordElement.offsetHeight / 2);

                    containerElement.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                }
            }
        }, 100);

        const activeWordIndex = transcript.words.findIndex(word =>
            currentTime >= (word.time - buffer) && currentTime < (word.time + word.duration)
        );

        if (activeWordIndex !== -1) {
            debouncedScroll(activeWordIndex);
        }

        return () => debouncedScroll.cancel();
    }, [currentTime, transcript.words]);

    // Add buffer for smooth words highlighting
    const buffer = 0.10;

    return (
        <div ref={containerRef} className={styles.transcriptionContainer}>

            {transcript.words.map((word, index) => {
                // The word be highlighted in case the currentTime in the frame of its word time
                const isActive = isHighlightingEnabled &&
                    currentTime >= (word.time - buffer) && currentTime < (word.time + word.duration);

                const setRef = (el: HTMLSpanElement) => {
                    wordRefs.current[index] = el;
                };

                return (
                    <span
                        key={`${index}+${word}`}
                        ref={isActive ? setRef : null}
                        className={isActive ? styles.activeWord : ""}
                    >
                        {word.text}{" "}
                    </span>
                );
            })}
        </div>
    );
};

export default TranscriptionText;
