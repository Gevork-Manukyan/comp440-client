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
import SearchPage from '../SearchPage/SearchPage';
import InsertItem from '../InsertItem/InsertItem';
import Reviews from '../Reviews/Reviews';
import ExpensiveItems from '../ExpensiveItems/ExpensiveItems';
import TwoItemsSameDay from '../TwoItemsSameDay/TwoItemsSameDay';
import ExcellentGoodItem from '../ExcellentGoodItem/ExcellentGoodItem';
import PopularUser from '../PopularUser/PopularUser';
import SameFriend from '../SameFriend/SameFriend';
import NotExcellentUser from '../NotExcellentUser/NotExcellentUser';
import NiceReviewers from '../NiceReviewers/NiceReviewers';
import MeanReviewers from '../MeanReviewers/MeanReviewers';
import GoodProducers from '../GoodProducers/GoodProducers';
import FriendUsers from '../FriendUsers/FriendUsers';


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

        <div className='flex-wrapper'>
          <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
          {authenticated ? <></> : <InitButton />}
        </div>

        <Routes>
          <Route path='/InsertItem' element={<InsertItem />} ></Route>
          <Route path="/register" element={<Register setUser={setUser} setAuthenticated={setAuthenticated} />} ></Route>
          <Route path="/login" element={<LoginPage setUser={setUser} setAuthenticated={setAuthenticated} />} ></Route>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/search" element={<SearchPage />} ></Route>
          <Route path='/reviews' element={<Reviews />} ></Route>

          <Route path='/expensiveItems' element={<ExpensiveItems />} ></Route>
          <Route path='/twoItemsSameDay' element={<TwoItemsSameDay />} ></Route>
          <Route path='/excellentGoodItem' element={<ExcellentGoodItem />} ></Route>
          <Route path='/popularUser' element={<PopularUser />} ></Route>
          <Route path='/sameFriend' element={<SameFriend />} ></Route>
          <Route path='/notExcellentUser' element={<NotExcellentUser />} ></Route>
          <Route path='/niceReviewers' element={<NiceReviewers />} ></Route>
          <Route path='/meanReviewers' element={<MeanReviewers />} ></Route>
          <Route path='/goodProducers' element={<GoodProducers />} ></Route>
          <Route path='/friendUsers' element={<FriendUsers />} ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
