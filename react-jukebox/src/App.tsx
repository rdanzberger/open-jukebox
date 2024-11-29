import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartSession from './pages/StartSession';
import JukeboxUI from './pages/JukeboxUi';
import Callback from "./components/Callback";
import SelectDevice from "./pages/SelectDevice";
import Search from "./pages/Search";
import Queue from "./pages/Queue";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<StartSession />} />
          <Route path="/jukebox" element={<JukeboxUI />} />
          <Route path="/callback" element={<Callback />} />
            <Route path="/select-device" element={<SelectDevice />} />
            <Route path="/search" element={<Search />} />
            <Route path="/queue" element={<Queue />} />
        </Routes>
      </Router>
  );
};

export default App;
