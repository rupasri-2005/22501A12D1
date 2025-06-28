import React from 'react';
import {Routes,Route} from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import StatsPage from './components/StatsPage';
import RedirectHandler from './components/RedirectHandler';
const App=()=>
(
  <Routes>
    <Route path="/" element={<ShortenerForm/>}/>
    <Route path="/stats" element={<StatsPage/>}/>
    <Route path="/:shortcode" element={<RedirectHandler/>}/>

  </Routes>
);
export default App;
