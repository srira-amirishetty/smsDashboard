import React, { useState } from 'react';
import authService from '../services/authService';

function LoginPage() {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            window.location.reload(); 
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (

        <div className="login">

            <h1 className='login-header'> Welcome to SMS Dashboard
            </h1>
            <h1 className='login-header'>Sign into your account</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Already have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default LoginPage;
