import React, { useState } from 'react';
import { StartPage } from './pages/start-page/start-page';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { TransactionsPage } from './pages/transactions-page/transactions-page';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="App" style={{ height: '100%' }}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage setIsSignedIn={setIsSignedIn} />} />
          <Route path="/home" element={<TransactionsPage isSignedIn={isSignedIn}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
