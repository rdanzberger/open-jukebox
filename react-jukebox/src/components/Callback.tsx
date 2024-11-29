import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';

const Callback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const client_id = 'change_me';
    const client_secret = 'change_me';

    useEffect(() => {
        const fetchAccessToken = async (code: string, state: string) => {
            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: 'http://localhost:3000/callback',
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
                    }
                });

                const { access_token, refresh_token } = response.data;
                localStorage.setItem('spotifyAccessToken', access_token);
                localStorage.setItem('spotifyRefreshToken', refresh_token);
                navigate('/search');
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');

        if (code && state) {
            fetchAccessToken(code, state);
        } else {
            console.error('Authorization code or state is missing');
        }
    }, [location, navigate]);

    return <div>Loading...</div>;
};

export default Callback;