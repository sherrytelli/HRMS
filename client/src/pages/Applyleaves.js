import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';
import './Applyleaves.css';

const Applyleaves = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const [leaveType, setLeaveType] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState({});

  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoAtten, setgotoatten] = useState(false);
  const [gotoLeaves, setgotoLeaves] = useState(false);
  const [gotoSalary, setgotoSalary] = useState(false);
  const [gotoChat, setgotoChat] = useState(false);

  const logout = async () => {
    navigate('/');
  };

  useEffect(() => {
    if(employeeID == null) {
      logout();
    }
  }, [employeeID]);

  const updategotoChat = async () => {
    setgotoChat(true);
  };

  useEffect(() => {
    if(gotoChat) {
      navigate('/chat', { state: { employeeID: employeeID}});
    }
  }, [gotoChat, employeeID]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const validationErrors = {};
    if (!leaveType) validationErrors.leaveType = "Leave type is required";
    if (!description) validationErrors.description = "Description is required";
    if (!startDate) validationErrors.startDate = "Start date is required";
    if (!endDate) validationErrors.endDate = "End date is required";

    setErrors(validationErrors);

    // If there are no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      const response = await fetch(`http://localhost:5000/newleave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeID,
          leaveType,
          startDate,
          endDate,
          description
        })
      });

      if(response.ok){
        updategotoLeaves();
      }
    }
  };

  return (
    <Fragment>
      <div className="apply-leave-container">
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
            <ListItem button="true" onClick={() => updategotoChat()}>
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

        <div className="apply-leave-content">
          <h2>APPLY FOR LEAVE</h2>
          <form className="apply-leave-form">
            <label>
              Type of Leave:
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className={errors.leaveType ? 'error-input' : ''}
              >
                <option value="" disabled>Select Leave Type</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="annual">Annual Leave</option>
                <option value="maternal">Maternal Leave</option>
                <option value="other">Other</option>
              </select>
              {errors.leaveType && <span className="error-text">{errors.leaveType}</span>}
            </label>
            <label>
              Description of Leave:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description here..."
                className={errors.description ? 'error-input' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </label>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={errors.startDate ? 'error-input' : ''}
              />
              {errors.startDate && <span className="error-text">{errors.startDate}</span>}
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={errors.endDate ? 'error-input' : ''}
              />
              {errors.endDate && <span className="error-text">{errors.endDate}</span>}
            </label>
            <button type="submit" className="submit-button" onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Applyleaves;
