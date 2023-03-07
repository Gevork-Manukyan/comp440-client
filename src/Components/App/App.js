import './App.css';
import '../../resources/themes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../Authentication/LoginPage/LoginPage"
import SignUpPage from "../Authentication/SignUpPage/SignUpPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/register" element={<SignUpPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
