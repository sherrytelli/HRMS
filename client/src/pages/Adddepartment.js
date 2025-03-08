import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
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
import './Adddepartment.css';

const Adddepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const [depName, setdepName] = useState("");
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
  const handleAddDep = async () => {
    const newErrors = {};

    // Validate fields
    if (!depName) newErrors.depName = "Department name is required";
    // if (!roleDescription) newErrors.roleDescription = "Role description is required";

    setErrors(newErrors);

    // If no errors, proceed to submit the form
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/adddepartment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            depName
          })
        });
        updateGotoDeplist();
      } catch (error) {
        console.error('Error adding department:', error);
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
              <h2>ADD NEW DEPARTMENT</h2>
            </div>
            <form className="form-container">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* <TextField
                    label="Department Name"
                    fullWidth
                    required
                    value={depName}
                    variant="outlined"
                    onChange={(e) => setdepName(e.target.value)}
                  /> */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Department Name"
                    fullWidth
                    required
                    value={depName}
                    variant="outlined"
                    onChange={(e) => setdepName(e.target.value)}
                    error={!!errors.depName} // Highlight the field if there is an error
                    helperText={errors.depName} // Show error message below the field
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddDep}
                  >
                    Add Department
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

export default Adddepartment;
