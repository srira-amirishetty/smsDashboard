import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isAuthenticated, onLogout }) {
    return (
        <div className="sidebar">
            <h2>SMS Dashboard</h2>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/program-control">Program Control</Link></li>
                <li><Link to="/country-operators">Country Operators</Link></li>
                {isAuthenticated ? (
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
