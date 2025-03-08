import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';
import './Leaves.css';

const Leaves = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const [leaveHistory, setLeaveHistory] = useState([]);

  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoAtten, setgotoatten] = useState(false);
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

  // Function to get status class based on the leave status
  const getStatusClass = (status) => {
    if (status === 'accepted') {
      return 'accepted-status';
    } else if (status === 'rejected') {
      return 'rejected-status';
    }
    return ''; // default (for 'pending' or other statuses)
  };

  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month (0-based index)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getleaves = async (id) => {
    const response = await fetch(`http://localhost:5000/getleaves/${id}`);
    const data = await response.json();
    setLeaveHistory(data);
  };

  useEffect(() => {
    getleaves(employeeID);
  }, [employeeID]);

  const gotoAddleaves = async (id) => {
    navigate('/leaves/apply-leave', { state: { employeeID: id } })
  };

  return (
    <Fragment>
      <div className="leave-request-container">
        <div className="sidebar">
          <List>
            <ListItem button="true" onClick={() => updateGotoDashboard()}> {/* Use button={true} to avoid warning */}
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button="true" onClick={() => updategotoAttendance()}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button="true">
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
            <ListItem button="true" onClick={() => logout()}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>

        <div className="leave-content">
          <div className="header">
            <h1>Leave Requests</h1>
            <button className="apply-button" onClick={() => gotoAddleaves(employeeID)}>
              Apply for Leave
            </button>
          </div>
          <div className="leave-history-table-container">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Type of Leave</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.length > 0 ? (
                  leaveHistory.map((leave, index) => (
                    <tr key={index}>
                      <td>{leave.leave_type}</td>
                      <td>{formatDate(leave.leave_start_date)}</td>
                      <td>{formatDate(leave.leave_end_date)}</td>
                      <td className={getStatusClass(leave.leave_status)}>{leave.leave_status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No leave history available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Leaves;
