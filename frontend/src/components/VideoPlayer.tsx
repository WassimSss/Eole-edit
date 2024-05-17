import React, { useState, useEffect, MouseEventHandler, useRef } from 'react';
import { Container } from 'react-bootstrap';

interface VideoPlayerProps {
    handleCloseVideo: MouseEventHandler<HTMLSpanElement>;
    urlVideoPlaying: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ handleCloseVideo, urlVideoPlaying }) => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);

    // Play or pause the video
    const handleClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true)
            } else {
                videoRef.current.pause();
                setIsPlaying(false)
            }
        }
    };

    // Update the current time of the video every 100ms
    if (isPlaying) {
        setInterval(() => {
            if (videoRef.current) {
                if (videoRef.current.currentTime / videoRef.current.duration * 100 === 100) {
                    setIsPlaying(false);
                }
                setCurrentTime(videoRef.current.currentTime / videoRef.current.duration * 100);
            }
        }, 100);
    }

    return (
        <Container style={{ position: 'relative' }}>
            <span
                onClick={handleCloseVideo}            >
                &#10006;
            </span>
            <video controls={false} ref={videoRef} width="100%" >
                <source src={`http://localhost:3000${urlVideoPlaying}`} type="video/mp4" />
            </video>
            <div className="d-flex flex-column justify-content-center">
                <button
                    onClick={handleClick}
                    className="btn btn-primary"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <input type="range" name="" id="" min={0} max={100} value={currentTime} />
            </div>

        </Container>
    );
};

export default VideoPlayer;
