import React, { useState } from 'react';
import { useGesture } from '@use-gesture/react';

const JukeboxUI: React.FC = () => {
    const [queue, setQueue] = useState<string[]>(['Song 1', 'Song 2', 'Song 3']);
    const [currentTrack, setCurrentTrack] = useState<string>('Song 1');

    const handleSkip = () => {
        if (queue.length > 1) {
            setCurrentTrack(queue[1]);
            setQueue(queue.slice(1));
        }
    };

    const bind = useGesture({
        onDrag: ({ velocity: [velocityX], direction: [x] }) => {
            if (velocityX > 0.5 && x < 0) {
                // High velocity and swipe left
                handleSkip();
            }
        },
    });

    return (
        <div {...bind()} style={{ padding: '20px', touchAction: 'none' }}>
            <h1>Now Playing</h1>
            <h2>{currentTrack}</h2>
            <h3>Queue</h3>
            {queue.map((song, index) => (
                <div
                    key={index}
                    style={{
                        margin: '10px 0',
                        padding: '10px',
                        background: '#f0f0f0',
                        borderRadius: '4px',
                    }}
                >
                    {song}
                </div>
            ))}
        </div>
    );
};

export default JukeboxUI;
