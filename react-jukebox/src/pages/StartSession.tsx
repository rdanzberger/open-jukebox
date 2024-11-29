import qs from "qs";

const StartSession: React.FC = () => {
    const client_id = 'change_me'
    const redirect_uri = 'http://localhost:3000/callback';

    const generateRandomString = (length: number) => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    const login = () => {
        const state = generateRandomString(16);
        const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';
        window.location.href = 'https://accounts.spotify.com/authorize?' +
            qs.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            });
    };

    return (
        <div>
            <h1>Authenticate with Spotify</h1>
            <button onClick={login}>Login with Spotify</button>
        </div>
    );
};

export default StartSession;