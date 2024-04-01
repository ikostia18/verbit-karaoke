import React, { useEffect, useRef } from 'react';
import styles from './MediaPlayer.module.css';

interface MediaPlayerProps {
    mediaUrl: string;
    onTimeUpdate: (time: number) => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ mediaUrl, onTimeUpdate }) => {
    const mediaRef = useRef<HTMLVideoElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const media = mediaRef.current;

        if (media) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => onTimeUpdate(media.currentTime), 10);
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, [mediaUrl, onTimeUpdate]);

    // *** Initial approach ***
    // useEffect(() => {
    //     const audio = audioRef.current;
    //     const updateTime = () => {
    //         if (audio) {
    //             onTimeUpdate(audio.currentTime);
    //         }
    //     };

    //     // The timeupdate event is typically fired every 250 milliseconds by the browser
    //     audio?.addEventListener('timeupdate', updateTime);

    //     return () => {
    //         audio?.removeEventListener('timeupdate', updateTime);
    //     };
    // }, [onTimeUpdate]);

    return (
        <div>
            <video ref={mediaRef} src={mediaUrl} controls className={styles.mediaPlayer} />
        </div>
    );
};

export default MediaPlayer;
