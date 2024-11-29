import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const SelectDevice: React.FC = () => {
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const token = localStorage.getItem('spotifyAccessToken');
                const response = await axios.get('https://api.spotify.com/v1/me/player/devices', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDevices(response.data.devices);
            } catch (error) {
                console.error('Error fetching devices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Select a Device
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {devices.length > 0 ? (
                        devices.map((device) => (
                            <ListItem component="button" key={device.id}>
                                <ListItemText primary={device.name} />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body1">No devices found</Typography>
                    )}
                </List>
            )}
        </Container>
    );
};

export default SelectDevice;