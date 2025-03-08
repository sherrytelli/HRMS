import React, { useState, Fragment, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChatIcon from '@mui/icons-material/Chat';
import "./Chat.css";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const messageWindowRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [messageText, setMessageText] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ employeeNumber: false, messageText: false });

  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoAtten, setgotoatten] = useState(false);
  const [gotoLeaves, setgotoLeaves] = useState(false);
  const [gotoSalary, setgotoSalary] = useState(false);

  const logout = async () => {
    navigate('/');
  };

  useEffect(() => {
    if(employeeID == null) {
      logout();
    }
  }, [employeeID]);

  const updategotoSalary = async () => {
    setgotoSalary(true);
  };

  useEffect(() => {
    if(gotoSalary) {
      navigate('/salary', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoSalary]);

  // Navigation effects
  const updategotoLeaves = async () => {
    setgotoLeaves(true);
  };

  useEffect(() => {
    if(gotoLeaves) {
      navigate('/leaves', { state: { employeeID: employeeID}});
    }
  }, [gotoLeaves, employeeID]);

  const updategotoAttendance = async () => {
    setgotoatten(true);
  };

  useEffect(() => {
    if(gotoAtten) {
      navigate('/emp-attendance', { state: { employeeID: employeeID}});
    }
  }, [gotoAtten, employeeID]);

  const updateGotoDashboard = () => {
    setgotoDashboard(true);
  };

  useEffect(() => {
    if (gotoDashboard) {
      navigate('/dashboard', { state: { employeeID: employeeID } });
    }
  }, [gotoDashboard, employeeID]);

  useEffect(() => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessages = async (id) => {
    const response = await fetch(`http://localhost:5000/getmessages/${id}`);
    const data = await response.json();
    if (response.ok) {
      setMessages(data);
    }
  };

  useEffect(() => {
    getMessages(employeeID);
  }, [employeeID]);

  const sendMessage = async () => {
    // Validate fields
    const errors = {
      employeeNumber: !employeeNumber || !/^\d+$/.test(employeeNumber), // Check if employeeNumber is not empty and is an integer
      messageText: !messageText,
    };
    setFieldErrors(errors);
  
    // Only send the message if no errors
    if (!errors.employeeNumber && !errors.messageText) {
      const rid = parseInt(employeeNumber);
      const sent_at = new Date().toISOString();
      const newMessage = {
        employeeID,
        rid,
        messageText,
        sent_at
      };

      const response = await fetch(`http://localhost:5000/verify/${rid}`);
      const data = await response.json();
  
      if(data.length > 0) {
        const response = await fetch(`http://localhost:5000/newmessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage) // Here it is stringified for the request
        });
    
        if (response.ok) {
          // Add the message object (not the stringified version)
          getMessages(employeeID);
          setMessageText("");
          setEmployeeNumber("");
        }
      }else {
        // Employee doesn't exist, highlight the employee number field in red
        setFieldErrors(prevErrors => ({
          ...prevErrors,
          employeeNumber: true
        }));
      }
    }
  };
  
  return (
    <Fragment>
      <div className="chat-container">
        <div className="sidebar">
          <List>
            <ListItem button onClick={() => updateGotoDashboard()}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => updategotoAttendance()}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button onClick={() => updategotoLeaves()}>
              <ListItemIcon><TaskAltIcon /></ListItemIcon>
              <ListItemText primary="Leaves" />
            </ListItem>
            <ListItem button="true" onClick={() => updategotoSalary()}>
              <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
              <ListItemText primary="Salary" />
            </ListItem>
            <ListItem button="true">
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => logout()}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>

        <div className="main-content">
          <div className="message-window" ref={messageWindowRef}>
            {messages.map((msg) => (
              <div
                // key={msg.message_id}
                className={`message-bubble ${msg.sender_id == employeeID ? "sent" : "received"}`}
              >
                <div className="message-meta">
                  {msg.sender_id == employeeID ? (
                    <span>To: {msg.receiver_id}</span>
                  ) : (
                    <span>From: {msg.sender_id}</span>
                  )}
                  <span className="timestamp">
                    {` - ${new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </span>
                </div>
                <span>{msg.message_content}</span>
              </div>
            ))}
          </div>

          <div className="input-row">
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              className={`input-field ${fieldErrors.employeeNumber ? "error" : ""}`} // Conditional class
            />
            <button onClick={() => sendMessage()} className="send-button">
              Send
            </button>
          </div>

          <textarea
            placeholder="Type your message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className={`message-box ${fieldErrors.messageText ? "error" : ""}`} // Conditional class
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
