import './App.css';
import '../../resources/themes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../Authentication/LoginPage/LoginPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
