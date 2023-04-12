import './App.css';
import '../../resources/themes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../Authentication/LoginPage/LoginPage"
import Register from "../Authentication/RegisterPage/RegisterPage"
import Home from "../Home/Home"
import InitButton from '../InitButton/InitButton';
import Navbar from '../Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />
        <InitButton />

        <Routes>
          <Route path='/InsertItem' ></Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/" element={<Home />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
