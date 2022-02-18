import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../components/Header';
import Leaflet from '../components/Leaflet';
import Navigation from '../components/Navigation';
import Bingo from './Bingo';
import Error from './Error';
import Home from './Home';
import Login from './Login';
import MyPage from './MyPage';
import PostCreate from './PostCreate';
import PrivateRoute from './PrivateRoute';
import Quiz from './Quiz';
import Report from './Report';

function App() {
  return (
    <div className="app">
      <div className="app-leaflet">
        <Leaflet />
      </div>
      <div className="app-service">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/write/*"
            element={
              <PrivateRoute>
                <PostCreate />
              </PrivateRoute>
            }
          />
          <Route path="/bingo" element={<Bingo />} />
          <Route path="/report/*" element={<Report />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/error" element={<Error />} />
        </Routes>
        <Navigation />
      </div>
    </div>
  );
}

export default App;
