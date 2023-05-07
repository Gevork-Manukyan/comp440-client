import './Navbar.css'
import { Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'
import { slide as Menu } from 'react-burger-menu'


export default function Navbar({ authenticated, setAuthenticated }) {
    const handleLogout = () => {
        apiClient.removeToken("token")
        setAuthenticated(false)
    }

    return (
        <div className="Navbar">
            <nav className="navbar">
                <div className={`item-section logged-in-items ${authenticated ? "" : "hidden"}`}>
                    <Menu>
                        <div className="nav-item"><Link to="/">Home</Link></div>
                        <div className="nav-item"><Link to="/search">Search</Link></div>
                        <div className="nav-item"><Link to="/reviews">Reviews</Link></div>
                        
                        <div className="nav-item"><Link to="/reviews">Expensive Items</Link></div>
                        <div className="nav-item"><Link to="/reviews">Two Items Same Day</Link></div>
                        <div className="nav-item"><Link to="/reviews">Excellent/Good Item</Link></div>
                        <div className="nav-item"><Link to="/reviews">Popular User</Link></div>
                        <div className="nav-item"><Link to="/reviews">Same Friends</Link></div>
                        <div className="nav-item"><Link to="/reviews">Not Excellent User</Link></div>
                        <div className="nav-item"><Link to="/reviews">Nice Reviewers</Link></div>
                        <div className="nav-item"><Link to="/reviews">Mean Reviewers</Link></div>
                        <div className="nav-item"><Link to="/reviews">Good Producers</Link></div>
                        <div className="nav-item"><Link to="/reviews">Friend Users</Link></div>
                    </Menu>

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