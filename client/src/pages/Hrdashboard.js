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
import './Hrdashboard.css';

const Hrdashboard = () => {
  const location = useLocation(); // Access the passed state
  const { employeeID } = location.state || {}; // Destructure employeeID from state
  const navigate = useNavigate();

  const [employeeName, setemployeeName] = useState('');
  const [departmentName, setdepartmentName] = useState('');

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
  
  useEffect(() => {
    //function to get employee_data
    const load_dashboard = async () => {
      const response = await fetch(`http://localhost:5000/dashboard/${employeeID}`);
      const data = await response.json();

      setemployeeName(data[0]?.full_name);
      setdepartmentName(data[0]?.department_name);
    };
    load_dashboard();
    
  }, [employeeID]);

  return (
    <Fragment>
      <div className="main">
        <div className="sidebar">
          <List>
            <ListItem button="true"> {/* Use button={true} to avoid warning */}
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
          <div className="dashboard">
            <div className="info-card">
              <h2>INFORMATION</h2>
              <p><strong>{employeeName}</strong></p>
              <p>Employee ID: {employeeID}</p>
              <p>Department Name: {departmentName}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hrdashboard;
