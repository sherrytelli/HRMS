import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import DepartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WorkIcon from '@mui/icons-material/Work';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';
import './Leavedetails.css';

const Leavedetails = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access the passed state
  const { employeeID, reqID } = location.state || {}; // Destructure employeeID from state

  const [leaveDetails, setLeaveDetails] = useState([]);

  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoEmpList, setgotoEmplist] = useState(false);
  const [gotoDepList, setgotoDepList] = useState(false);
  const [gotoJobroles, setgotojobroles] = useState(false);
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
      navigate('/hr-chat', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoChat]);

  const updategotoSalary = async () => {
    setgotoSalary(true);
  };

  useEffect(() => {
    if(gotoSalary) {
      navigate('/hr-salary', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoSalary]);

  const updategotoLeaves = async () => {
    setgotoLeaves(true);
  };

  useEffect(() => {
    if(gotoLeaves) {
      navigate('/hr-leaves', { state: { employeeID: employeeID}});
    }
  }, [gotoLeaves, employeeID]);

  const updategotoAttendance = async () => {
    setgotoatten(true);
  };

  useEffect(() => {
    if(gotoAtten) {
      navigate('/hr-attendance', { state: { employeeID: employeeID}});
    }
  }, [gotoAtten, employeeID]);

  const updategotojobroles = async () => {
    setgotojobroles(true);
  };

  useEffect(() => {
    if(gotoJobroles) {
      navigate('/hr-jobroleslist', { state: { employeeID: employeeID}});
    }
  }, [gotoJobroles, employeeID]);

  const updateGotoEmplist = async (e) => {
    setgotoEmplist(true);
    console.log("employeelist state changes to true");
  };

  useEffect(() => {
    if(gotoEmpList){
      navigate('/hr-employeelist', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoEmpList]);

  const updateGotoDeplist = async (e) => {
    setgotoDepList(true);
  };

  useEffect(() => {
    if(gotoDepList){
      navigate('/hr-departmentlist',  { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoDepList]);

  const updateGotoDashboard = async (e) => {
    setgotoDashboard(true);
    console.log("gotodashboard state changes to true");
  };

  useEffect(() => {
    if(gotoDashboard){
      navigate('/hr-dashboard', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoDashboard]);

  const getDetails = async(reqID) => {
    const respnse = await fetch(`http://localhost:5000/getleavedetails/${reqID}`);
    const data = await respnse.json();
    setLeaveDetails(data);
  };

  useEffect(() => {
    getDetails(reqID);
  }, [reqID]);

  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month (0-based index)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleAccept = async (reqID) => {
    const response = await fetch(`http://localhost:5000/acceptleave/${reqID}`, {
      method: 'PUT',
    });
    
    if(response.ok) {
      updategotoLeaves();
    }
  };

  const handleReject = async (reqID) => {
    const response = await fetch(`http://localhost:5000/rejectleave/${reqID}`, {
      method: 'PUT',
    });
    
    if(response.ok) {
      updategotoLeaves();
    }
  };

  return (
    <Fragment>
      <div className="main">
        <div className="sidebar">
          <List>
            <ListItem button="true" onClick={() => updateGotoDashboard()}> {/* Use button={true} to avoid warning */}
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button="true" onClick={() => updateGotoEmplist()}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button="true" onClick={() => updateGotoDeplist()}>
              <ListItemIcon><DepartmentIcon /></ListItemIcon>
              <ListItemText primary="Departments" />
            </ListItem>
            <ListItem button="true" onClick={() => updategotoAttendance()}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button="true" onClick={() => updategotojobroles()}>
              <ListItemIcon><WorkIcon /></ListItemIcon>
              <ListItemText primary="Jobroles" />
            </ListItem>
            <ListItem button="true" onClick={() => updategotoLeaves()}>
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

        <div className="content">
          {leaveDetails ? (
            <div className="details-card">
              <h2>Leave Request Details</h2>
              <p><strong>Request ID:</strong> {reqID}</p>
              <p><strong>Employee Name:</strong> {leaveDetails[0]?.full_name}</p>
              <p><strong>Department:</strong> {leaveDetails[0]?.department_name}</p>
              <p><strong>Leave Type:</strong> {leaveDetails[0]?.leave_type}</p>
              <p><strong>Description:</strong> {leaveDetails[0]?.decription}</p>
              <p><strong>Start Date:</strong> {formatDate(leaveDetails[0]?.leave_start_date)}</p>
              <p><strong>End Date:</strong> {formatDate(leaveDetails[0]?.leave_end_date)}</p>
              <p><strong>Status:</strong> {leaveDetails[0]?.leave_status}</p>
              <div className="action-buttons">
                {leaveDetails[0]?.leave_status !== "accepted" && leaveDetails[0]?.leave_status !== "rejected" && (
                  <div className="accept-reject-buttons">
                    <button className="accept-button" onClick={() => handleAccept(reqID)}>Accept</button>
                    <button className="reject-button" onClick={() => handleReject(reqID)}>Reject</button>
                  </div>
                )}
                <button className="back-button" onClick={() => updategotoLeaves()}>
                  Back to Requests
                </button>
              </div>
            </div>
          ) : (
            <p>Loading details...</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Leavedetails;