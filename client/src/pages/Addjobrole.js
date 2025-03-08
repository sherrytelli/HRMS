import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import './Addjobrole.css';
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

const Addjobrole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID, depID } = location.state || {};

  const [roleTitle, setRoleTitle] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [errors, setErrors] = useState({});
  
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

  // Redirect functions
  const updateGotoDeplist = () => {
    setgotoDepList(true);
  };

  useEffect(() => {
    if(gotoDepList){
      navigate('/hr-departmentlist', { state: { employeeID: employeeID } });
    }
  }, [gotoDepList, navigate, employeeID]);

  const updateGotoDashboard = () => {
    setgotoDashboard(true);
  };

  useEffect(() => {
    if (gotoDashboard) {
      navigate('/hr-dashboard', { state: { employeeID: employeeID } });
    }
  }, [gotoDashboard, navigate, employeeID]);

  const updateGotoEmplist = () => {
    setgotoEmplist(true);
  };

  useEffect(() => {
    if (gotoEmpList) {
      navigate('/hr-employeelist', { state: { employeeID: employeeID } });
    }
  }, [gotoEmpList, navigate, employeeID]);

  // Handle form submission
  const handleAddJobRole = async () => {
    const newErrors = {};

    // Validate fields
    if (!roleTitle) newErrors.roleTitle = "Role title is required";
    if (!roleDescription) newErrors.roleDescription = "Role description is required";

    setErrors(newErrors);

    // If no errors, proceed to submit the form
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/addjobrole', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            roleTitle, 
            roleDescription,
            depID
          })
        });
        updategotojobroles();
      } catch (error) {
        console.error('Error adding job role:', error);
      }
    }
  };

  return (
    <Fragment>
      <div className="app">
        <div className="sidebar">
          <List>
            <ListItem button onClick={() => updateGotoDashboard()}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => updateGotoEmplist()}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button onClick={() => updateGotoDeplist()}>
              <ListItemIcon><DepartmentIcon /></ListItemIcon>
              <ListItemText primary="Departments" />
            </ListItem>
            <ListItem button onClick={() => updategotoAttendance()}>
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
            <ListItem button onClick={() => logout()}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>

        <div className="content">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>ADD NEW JOB ROLE</h2>
            </div>
            <form className="form-container" onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role Title"
                    fullWidth
                    required
                    variant="outlined"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    error={Boolean(errors.roleTitle)}
                    helperText={errors.roleTitle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Role Description"
                    fullWidth
                    required
                    variant="outlined"
                    multiline
                    rows={4}
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                    error={Boolean(errors.roleDescription)}
                    helperText={errors.roleDescription}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddJobRole}
                  >
                    Add Job Role
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Addjobrole;
