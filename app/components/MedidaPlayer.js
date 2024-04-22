'use client'

import React, { useRef, useEffect, useState } from 'react';
import Play from '../assets/icons/play.svg'
import Stop from '../assets/icons/stop.svg'
import { useGlobalContext } from '@/app/context/context';

function MediaComponent({ media, type, PreviewMode, fileName, hasLightBG }) {

    const {state}=useGlobalContext()
    const mediaSourceRef = useRef(null);
    const seekbarRef = useRef(null);
    const bubbleRef = useRef(null);
    const playRef = useRef(null);
    const pauseRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);


    let fileURL = type === 'music' ? `${fileName}_music.${media.ext}` : `${fileName}_video.${media.ext}`
    let coverURL = `${fileName}_cover.${media.coverExt}`


    const getTitle = (e) => {
        return e.toLowerCase().split(' ').join('_');
    };

    const setProgress = (e) => {
        const mediaSource = mediaSourceRef.current;

        if (!isNaN(mediaSource.duration) && isFinite(mediaSource.duration)) {
            const time = mediaSource.duration * (e.target.value / 100);
            mediaSource.currentTime = time;
        }
    };

    const updateSeek = () => {
        const mediaSource = mediaSourceRef.current;
        const timenow = mediaSource.currentTime;
        const seekbar = seekbarRef.current;
        const bubble = bubbleRef.current;
        const value = (100 / mediaSource.duration) * timenow;
        seekbar.value = value;

        let m = Math.floor(timenow / 60);
        let s = Math.floor(timenow % 60);
        if (m.toString().length < 2) {
            m = '0' + m;
        }
        if (s.toString().length < 2) {
            s = '0' + s;
        }
        bubble.innerText = m + ':' + s;

        if (value === 100) {
            setIsPlaying(false);
            seekbar.value = 0;
            bubble.innerText = '00:00';
        }
    };

    const togglePlay = () => {
        const mediaSource = mediaSourceRef.current;
        const play = playRef.current;
        const pause = pauseRef.current;

        if (mediaSource.paused) {
            mediaSource.play();
            play.style.display = 'none';
            pause.style.display = 'block';
        } else {
            mediaSource.pause();
            play.style.display = 'block';
            pause.style.display = 'none';
        }
    };

    useEffect(() => {
        const mediaSource = mediaSourceRef.current;


        const play = playRef.current;
        const pause = pauseRef.current;

        mediaSource.addEventListener('play', () => {
            setIsPlaying(true);
            play.style.display = 'none';
            pause.style.display = 'block';
        });

        mediaSource.addEventListener('pause', () => {
            setIsPlaying(false);
            play.style.display = 'block';
            pause.style.display = 'none';
        });

        return () => {
            mediaSource.removeEventListener('play', () => { });
            mediaSource.removeEventListener('pause', () => { });
        };
    }, []);

    return (
        <div className="mediaC">
            <video
                ref={mediaSourceRef}
                className="source"
                style={{ pointerEvents: PreviewMode ? 'none' : 'auto' }}
                controls={!PreviewMode}
                preload="metadata"
                onTimeUpdate={updateSeek}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
            >
                <source
                    src={
                        PreviewMode
                            ? media.dataURI + '#t=0.2'
                            : `./media/${fileURL}`
                    }
                />
            </video>
            {type === 'music' && media.coverDataURI && (
                <img
                    src={
                        PreviewMode
                            ? media.coverDataURI
                            : coverURL
                    }
                    alt="cover"
                />
            )}
            <div className="controls">
                <p
                    style={{ color: 'black !important' }}
                    className="mediaInfo"
                    v-if={media.artist}
                >
                    <span>{media.artist}</span>
                    {media.album && <span> - {media.album}</span>}
                </p>
                <div
                    className="pCtrl"
                    style={{ display: PreviewMode ? 'flex' : 'none' }}
                >
                    <output
                        style= { hasLightBG(state?.color?.featuredContentBackground) ? {filter: "invert(1)" } : {filter: "" }}
                    className="currentTime card" ref={bubbleRef}>
                        00:00
                    </output>
                    <input
                        className="seekBar"
                        onChange={setProgress}
                        ref={seekbarRef}
                        type="range"
                        value="0"
                    />
                    <a
                        className="playPause"
                        style={{backgroundColor: `${state.color?.buttonBackground}` }}
                        onClick={togglePlay}
                    >
                        <div
                            className="icon play action"
                            ref={playRef}
                            style={hasLightBG(state?.color?.buttonBackground) ? { filter: "invert(1)" } : { filter: "" }}

                        >
                            <Play/>
                        </div>
                        <div
                            className="icon pause action"
                            ref={pauseRef}
                            style={hasLightBG(state?.color?.buttonBackground) ? { filter: "invert(1)" } : { filter: "" }}

                        >
                            <Stop/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MediaComponent;