import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import CountryOperatorPage from './pages/CountryOperatorPage';
import ProgramControl from './components/ProgramControl';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import authService from './services/authService';
import './App.css'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const valid = await authService.verifyToken(token);
                setIsAuthenticated(valid);
                if (!valid) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="app">
                {isAuthenticated && <Sidebar isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
                <div className="main-content">
                    <Routes>
                      
                        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />

                        
                        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />

                   
                        {isAuthenticated ? (
                            <>
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/country-operators" element={<CountryOperatorPage />} />
                                <Route path="/program-control" element={<ProgramControl />} />
                            </>
                        ) : (
                            
                            <Route path="*" element={<Navigate to="/" />} />
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
