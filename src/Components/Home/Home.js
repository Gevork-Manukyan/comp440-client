import InsertItem from '../InsertItem/InsertItem';
import './Home.css';
import { motion } from 'framer-motion';

export default function Home() {
    return (
    <div className="Home">
        <motion.h1 whileHover={{ scale: 1.1 }}>
            Welcome to the Home Page!
        </motion.h1>
        <InsertItem />
    </div>
    )
}