import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [eID, seteID] = useState('');
  const [password, setPassword] = useState('');
  const [isloginHR, setloginHR] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [eIDError, setEIDError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date(); // Get the current date
    const year = today.getFullYear(); // Get the year (e.g., 2024)
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad to 2 digits
    const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad to 2 digits
  
    return `${year}/${month}/${day}`; // Format the date as yyyy/mm/dd
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Reset error states before making the request
    setEIDError(false);
    setPasswordError(false);
    
    try {
      const login_response = await fetch(`http://localhost:5000/get-login/${eID}`);
      const login_data = await login_response.json();

      if (!login_data[0]?.password_hash) {
        // Employee ID not found
        setEIDError(true);
        console.log("No employee");
      } else if (password === login_data[0]?.password_hash) {
        // Password is correct
        console.log("Employee correct");
        
        const date = getCurrentDate();
        const response = await fetch(`http://localhost:5000/markpresent`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eID,
            date
          })
        });

        if ('Human Resources' === login_data[0]?.department_name) {
          setloginHR(true);
        } else {
          setIsLogin(true);
        }
      } else {
        // Password is incorrect
        setPasswordError(true);
        console.log("Incorrect password");
      }

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Navigate to HR dashboard if HR login is successful
  useEffect(() => {
    if (isloginHR) {
      navigate('/hr-dashboard', { state: { employeeID: eID } });
    }
  }, [isloginHR, eID, navigate]);

  // Navigate to regular dashboard if non-HR login is successful
  useEffect(() => {
    if (isLogin) {
      navigate('/dashboard', { state: { employeeID: eID } });
    }
  }, [isLogin, eID, navigate]);

  return (
    <Fragment>
      <div className="login-container">
        <form className="login-form">
          <h2>LOGIN</h2>
          <div className={`input-container ${eIDError ? 'error' : ''}`}>
            <input
              type="text"
              placeholder="Employee ID"
              value={eID}
              onChange={(e) => seteID(e.target.value)}
              required
            />
          </div>
          <div className={`input-container ${passwordError ? 'error' : ''}`}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleLogin} className="login-button">LOG IN</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
