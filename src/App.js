import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if we don't use useEffect, then it would create an infinite loop of
  // checking if the userIsLoggedIn and then re-executes it, using
  // useEffect controls when it should happen
  useEffect(() => {
    // this is the code that we don't want to run directly in the component
    // section (i.e under App()), because now it is only executed after
    // every component re-evaluation and ONLY if the dependencies change
    // for example, if the app is being rendered the very fist time.
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
    // having the dependency as empty, means that the anonymous function will 
    // only run once (when the page is loaded)
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    // localStorage is a global variable provided by the browser --> go to DevTools/Application/Local Storage
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

/*
data storage and data fetching is a SIDE effect of the app, it is not 
part of the rendered UI which is why we use useEffect to control 
its behaviour


notes on useEffect:
you should add "everything" you use in the ffect function as a dependency
except for the following
  1. state updating functions -> React guarantees that those functions never change
  2. built-in APIs (fetch(), localStorage) -> not related React, exist globally
  3. any variables that were defined outside of components (helpers...)
*/

export default App;
