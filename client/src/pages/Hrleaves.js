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
import './Hrleaves.css';

const Hrleaves = () => {
  const location = useLocation(); // Access the passed state
  const { employeeID } = location.state || {}; // Destructure employeeID from state
  const navigate = useNavigate();

  const [leaveRequests, setleaveRequests] = useState([]);

  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoEmpList, setgotoEmplist] = useState(false);
  const [gotoDepList, setgotoDepList] = useState(false);
  const [gotoJobroles, setgotojobroles] = useState(false);
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

  const gotoReqDetails = async (employeeID, reqID) => {
    navigate('/hr-leaves/detail', { state: { employeeID: employeeID, reqID: reqID }});
  };

  const getrequests = async () => {
    const response = await fetch(`http://localhost:5000/getleaverequests`);
    const data = await response.json();
    setleaveRequests(data);
  };

  useEffect(() => {
    getrequests();
  }, []);

   // Function to get status class based on the leave status
   const getStatusClass = (status) => {
    if (status === 'accepted') {
      return 'accepted-status';
    } else if (status === 'rejected') {
      return 'rejected-status';
    }
    return ''; // default (for 'pending' or other statuses)
  };

  return (
    <Fragment>
      <div className="leaves-page-container">
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

        <div className="main-content">
          <div className="header">
            <h2>LEAVE REQUESTS</h2>
          </div>
          <table className="leave-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.leave_request_id}>
                  <td>{request.leave_request_id}</td>
                  <td>{request.full_name}</td>
                  <td>{request.leave_type}</td>
                  <td className={getStatusClass(request.leave_status)}>{request.leave_status}</td>
                  <td>
                    <button onClick={() => gotoReqDetails(employeeID, request.leave_request_id)}>view</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Hrleaves;