import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Search: React.FC = () => {
    const [songQuery, setSongQuery] = useState('');
    const [artistQuery, setArtistQuery] = useState('');
    const [albumQuery, setAlbumQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [queueStatus, setQueueStatus] = useState<{ [key: string]: 'idle' | 'success' | 'error' }>({});

    const handleSearch = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('spotifyAccessToken');
            const response = await axios.get('https://api.spotify.com/v1/search', {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    q: `${songQuery ? `track:${songQuery}` : ''} ${artistQuery ? `artist:${artistQuery}` : ''} ${albumQuery ? `album:${albumQuery}` : ''}`.trim(),
                    type: 'track,artist,album',
                },
            });
            setResults(response.data.tracks.items);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToQueue = async (uri: string, id: string) => {
        try {
            const token = localStorage.getItem('spotifyAccessToken');
            await axios.post('https://api.spotify.com/v1/me/player/queue', null, {
                headers: { Authorization: `Bearer ${token}` },
                params: { uri },
            });
            setQueueStatus((prevStatus) => ({ ...prevStatus, [id]: 'success' }));
        } catch (error) {
            console.error('Error adding to queue:', error);
            setQueueStatus((prevStatus) => ({ ...prevStatus, [id]: 'error' }));
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Search for a Song, Artist, or Album
            </Typography>
            <TextField
                label="Song"
                variant="outlined"
                fullWidth
                value={songQuery}
                onChange={(e) => setSongQuery(e.target.value)}
                margin="normal"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <TextField
                label="Artist"
                variant="outlined"
                fullWidth
                value={artistQuery}
                onChange={(e) => setArtistQuery(e.target.value)}
                margin="normal"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <TextField
                label="Album"
                variant="outlined"
                fullWidth
                value={albumQuery}
                onChange={(e) => setAlbumQuery(e.target.value)}
                margin="normal"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
                Search
            </Button>
            <Button component={Link} to="/queue" variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
                Go to Queue
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {results.length > 0 ? (
                        results.map((result) => (
                            <ListItem key={result.id} secondaryAction={
                                queueStatus[result.id] === 'success' ? (
                                    <CheckIcon color="success" />
                                ) : queueStatus[result.id] === 'error' ? (
                                    <CloseIcon color="error" />
                                ) : (
                                    <Button variant="contained" color="secondary" onClick={() => addToQueue(result.uri, result.id)}>
                                        Add to Queue
                                    </Button>
                                )
                            }>
                                <ListItemText primary={result.name} secondary={result.artists.map((artist: any) => artist.name).join(', ')} />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body1">No results found</Typography>
                    )}
                </List>
            )}
        </Container>
    );
};

export default Search;