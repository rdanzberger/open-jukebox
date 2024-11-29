import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const Queue: React.FC = () => {
    const [queue, setQueue] = useState<any[]>([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [loadingPlayback, setLoadingPlayback] = useState(true);

    const fetchQueue = async () => {
        try {
            const token = localStorage.getItem('spotifyAccessToken');
            const response = await axios.get('https://api.spotify.com/v1/me/player/queue', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQueue(response.data.queue);
        } catch (error) {
            console.error('Error fetching queue:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentlyPlaying = async () => {
        try {
            const token = localStorage.getItem('spotifyAccessToken');
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCurrentlyPlaying(response.data.item);
        } catch (error) {
            console.error('Error fetching currently playing track:', error);
        } finally {
            setLoadingPlayback(false);
        }
    };

    useEffect(() => {
        fetchQueue();
        fetchCurrentlyPlaying();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === '39') {
            skipToNext();
        }
    };

    const skipToNext = async () => {
        try {
            const token = localStorage.getItem('spotifyAccessToken');
            await axios.post('https://api.spotify.com/v1/me/player/next', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoadingPlayback(true);
            await fetchCurrentlyPlaying();
            await fetchQueue();
        } catch (error) {
            console.error('Error skipping to next track:', error);
        }
    };

    const skipToPrevious = async () => {
        try {
            const token = localStorage.getItem('spotifyAccessToken');
            await axios.post('https://api.spotify.com/v1/me/player/previous', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoadingPlayback(true);
            await fetchCurrentlyPlaying();
            await fetchQueue();
        } catch (error) {
            console.error('Error skipping to previous track:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Spotify Queue
            </Typography>
            <Button component={Link} to="/search" variant="contained" color="secondary" style={{ marginBottom: '20px' }}>
                Add a song
            </Button>
            <Typography variant="h5" gutterBottom>
                Playback Controls
            </Typography>
            {loadingPlayback ? (
                <CircularProgress />
            ) : currentlyPlaying ? (
                <div>
                    <Typography variant="h6">{currentlyPlaying.name}</Typography>
                    <Typography variant="body1">
                        {currentlyPlaying.artists.map((artist: any) => artist.name).join(', ')}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={skipToPrevious}>
                        Previous
                    </Button>
                    <Button variant="contained" color="primary" onKeyDown={handleKeyDown} onClick={skipToNext} style={{ marginLeft: '10px' }}>
                        Next
                    </Button>
                </div>
            ) : (
                <Typography variant="body1">No track currently playing</Typography>
            )}
            {loading ? (
                <CircularProgress />
            ) : (
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Queue</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {queue.length > 0 ? (
                                queue.map((item) => (
                                    <ListItem key={item.id}>
                                        <ListItemText primary={item.name} secondary={item.artists.map((artist: any) => artist.name).join(', ')} />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body1">No items in queue</Typography>
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>
            )}
        </Container>
    );
};

export default Queue;