import React, { Fragment, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
          <Routes>
            <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/userDashboard"/> : (<Login setAuth={setAuth}/>)} 
            />
            <Route
              path="/userDashboard"
              element={isAuthenticated ? <UserDashboard setAuth={setAuth}/> : <Navigate to="/login"/>}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/login"/> : <Register setAuth={setAuth}/> } 
            />
          </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
