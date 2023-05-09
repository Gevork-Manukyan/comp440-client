import './Navbar.css'
import { Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'
import { slide as Menu } from 'react-burger-menu'


export default function Navbar({ authenticated, setAuthenticated, setUser, user }) {
    const handleLogout = () => {
        apiClient.removeToken("token")
        setAuthenticated(false)
        setUser("")
    }

    return (
        <div className="Navbar">
            <nav className="navbar">
                <div className={`item-section logged-in-items ${authenticated ? "" : "hidden"}`}>
                    <Menu>
                        <div className="nav-item"><Link to="/">Home</Link></div>
                        <div className="nav-item"><Link to="/search">Search</Link></div>
                        <div className="nav-item"><Link to="/reviews">Reviews</Link></div>
                        
                        <div className="nav-item"><Link to="/expensiveItems">Expensive Items</Link></div>
                        <div className="nav-item"><Link to="/twoItemsSameDay">Two Items Same Day</Link></div>
                        <div className="nav-item"><Link to="/excellentGoodItem">Excellent/Good Item</Link></div>
                        <div className="nav-item"><Link to="/popularUser">Popular User</Link></div>
                        <div className="nav-item"><Link to="/sameFriend">Same Friends</Link></div>
                        <div className="nav-item"><Link to="/notExcellentUser">Not Excellent User</Link></div>
                        <div className="nav-item"><Link to="/niceReviewers">Nice Reviewers</Link></div>
                        <div className="nav-item"><Link to="/meanReviewers">Mean Reviewers</Link></div>
                        <div className="nav-item"><Link to="/goodProducers">Good Producers</Link></div>
                        <div className="nav-item"><Link to="/friendUsers">Friend Users</Link></div>
                    </Menu>

                </div>
                <div id='username'>
                    {user?.username}
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