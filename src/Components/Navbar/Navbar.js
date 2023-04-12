import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className="Navbar">
            <nav className="navbar">
                <div className="nav-item"><Link to="/">Insert Item</Link></div>
                <div className="nav-item"><Link to="/">Blank</Link></div>
                <div className="nav-item"><Link to="/">Blank</Link></div>
            </nav>
        </div>
    )
}