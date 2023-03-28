import './App.css';
import '../../resources/themes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../Authentication/LoginPage/LoginPage"
import Register from "../Authentication/RegisterPage/RegisterPage"
import Home from "../Home/Home"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/home" element={<Home />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
