import { current } from '@reduxjs/toolkit';
import React, { useState, useEffect, MouseEventHandler, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { formatSecondsToMinutes } from '../modules/formatSecondsToMinutes';

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
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    /**
     * Handles the time update event of the video player.
     * @param e - The change event of the input element.
     */
    const handleTimeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            setCurrentTime(Number(e.target.value) * videoRef.current.duration / 100);
            videoRef.current.currentTime = Number(e.target.value) * videoRef.current.duration / 100;
        }
    }

    // Update the current time of the video
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // If the video is playing, update the current time every 100ms
        if (isPlaying) {
            console.log("videoRef.current.currentTime : ", videoRef.current?.currentTime);
            interval = setInterval(() => {

                if (videoRef.current) {
                    // If the video is at the end, stop playing
                    if (videoRef.current.currentTime / videoRef.current.duration * 100 === 100) {
                        setIsPlaying(false);
                    }
                    // Update the current time
                    setCurrentTime(videoRef.current.currentTime);
                }
            }, 100);
        }

        // Clear the interval when the video is paused, finished or when the component unmounts
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying]);

    return (
        <Container className='w-50 h-50 mt-4'>

            
            <div className='position-relative'>
                <span className='position-absolute top-0 end-0 z-3 fs-3 me-1' onClick={handleCloseVideo} style={{ cursor: "pointer" }}>
                    <IoCloseSharp />
                </span>
                <video controls={false} ref={videoRef} className='w-100 border border-success position-relative' >

                    <source src={`http://localhost:3000${urlVideoPlaying}`} type="video/mp4" />

                </video>
                <span className='position-absolute top-50 start-50' style={{ transform: 'translate(-50%, -50%)' }}>
                    {!isPlaying && <FaCirclePlay style={{ fontSize: '5rem' }} />}
                </span>
            </div>
            <button className='btn btn-success w-100' onClick={handleClick}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <input type="range" name="" id="" className='w-100' min={0} max={100} value={videoRef.current ? currentTime / videoRef.current.duration * 100 : 0} onChange={(e) => handleTimeUpdate(e)} style={{ background: "#590C51" }} />
            <p className='fs-4 fw-bolder text-center'>{formatSecondsToMinutes(currentTime)}{videoRef.current && '/' + formatSecondsToMinutes(videoRef.current.duration)}</p>

        </Container>
    );
};

export default VideoPlayer;
