import './App.css';
import '../../resources/themes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../Authentication/LoginPage/LoginPage"
import Register from "../Authentication/RegisterPage/RegisterPage"
import Home from "../Home/Home"
import InitButton from '../InitButton/InitButton';
import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';

function App() {

  const [user, setUser] = useState();
  const [errors, setErrors] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    const fetchAuthedUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (error) setErrors(error);
      if (data?.user) setUser(data.user);
      setAuthenticated(true);
    };

    const token = localStorage.getItem("token");
    if (token) {
      apiClient.setToken(token);
      fetchAuthedUser();
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>

        <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <InitButton />

        <Routes>
          <Route path='/insertItem' ></Route>
          <Route path="/register" element={<Register setUser={setUser} setAuthenticated={setAuthenticated} />} ></Route>
          <Route path="/login" element={<LoginPage setUser={setUser} setAuthenticated={setAuthenticated} />} ></Route>
          <Route path="/" element={<Home />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
