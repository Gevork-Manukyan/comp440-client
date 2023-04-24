import { Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'
import './Navbar.css'

export default function Navbar({ authenticated, setAuthenticated }) {
    const handleLogout = () => {
        apiClient.removeToken("token")
        setAuthenticated(false)
    }

    return (
        <div className="Navbar">
            <nav className="navbar">
                <div className='item-section logged-in-items'>
                    <div className="nav-item"><Link to="/">Insert Item</Link></div>
                    <div className="nav-item"><Link to="/search">Search</Link></div>
                    <div className="nav-item"><Link to="/">Blank</Link></div>
                </div>
                <div className='item-section auth-section'>
                    {authenticated ? 
                        <div className='item-section logout-item'>
                            <div className="nav-item" onClick={handleLogout}><Link to="/login">Logout</Link></div>
                        </div>
                    : 
                        <div className='item-section login-register'>
                            <div className="nav-item"><Link to="/login">Login</Link></div>
                            <div className="nav-item"><Link to="/register">Register</Link></div>
                        </div>
                    }
                    
                </div>
            </nav>
        </div>
    )
}