import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import './Addemployee.css';
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

const Addemployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState({});
  const [departmentlist, setdepartmentlist] = useState([]);
  const [jobrolelist, setjobrolelist] = useState([]);

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

  const updateGotoDeplist = async (e) => {
    setgotoDepList(true);
  };

  useEffect(() => {
    if(gotoDepList){
      navigate('/hr-departmentlist',  { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoDepList]);
  
  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    get_department_roles(selectedDepartment);
  };

  const get_department_list = async () => {
    const response = await fetch(`http://localhost:5000/departmentlist`);
    const data = await response.json();
    setdepartmentlist(data);
  };

  const get_department_roles = async (department_id) => {
    const response = await fetch(`http://localhost:5000/getroles/${department_id}`);
    const data = await response.json();
    setjobrolelist(data);
  };

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 10 }, () => 
        characters[Math.floor(Math.random() * characters.length)]
    ).join('');
  };

  const handleaddemployee = async () => {
    const newErrors = {};

    // Check required fields
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!department) newErrors.department = "Department is required";
    if (!role) newErrors.role = "Role is required";
    if (!salary) newErrors.salary = "Salary is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    setErrors(newErrors);

    // If there are no errors, proceed with adding employee
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`http://localhost:5000/addemployee`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName, 
            lastName, 
            email, 
            phoneNumber, 
            dateOfBirth, 
            department, 
            role, 
            salary
          }),
        });

        if (response.ok) {
          const responseid = await fetch(`http://localhost:5000/newempid`);
          const data = await responseid.json();
          const newempid = data[0]?.employee_id;
          const password = generateRandomString();
          console.log("the new employee has ID: ", newempid, "password: ", password);
          const response_login = await fetch(`http://localhost:5000/newlogininfo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              newempid,
              password
            })
          });
          add_to_history(newempid);
          updateGotoEmplist();
        }
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
  };

  const add_to_history = async (id) => {
    const response1 = await fetch(`http://localhost:5000/getdepname/${department}`);
    const data1 = await response1.json();
    const dep_name = data1[0]?.department_name;
    const response2 = await fetch(`http://localhost:5000/getjobtitle/${role}`);
    const data2 = await response2.json();
    const role_name = data2[0]?.role_title;

    const res1 = await fetch(`http://localhost:5000/newemphisdpt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        dep_name
      })
    });

    const res2 = await fetch(`http://localhost:5000/newemphissal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        salary
      })
    });

    const res3 = await fetch(`http://localhost:5000/newemphisjr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        role_name
      })
    });
  };

  useEffect(() => {
    get_department_list();
  }, []);

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

  return (
    <Fragment>
      <div className="app">
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
          <div className="form-wrapper">
            <div className="form-header">
              <h2>ADD NEW EMPLOYEE</h2>
            </div>
            <form className="form-container" onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    required
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    required
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    required
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(errors.department)}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={department}
                      onChange={handleDepartmentChange}
                      label="Department"
                    >
                      {departmentlist.map((dept) => (
                        <MenuItem key={dept.department_id} value={dept.department_id}>
                          {dept.department_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(errors.role)}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Role"
                    >
                      {jobrolelist.map((role) => (
                        <MenuItem key={role.job_role_id} value={role.job_role_id}>
                          {role.role_title}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Salary"
                    type="number"
                    fullWidth
                    required
                    variant="outlined"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    error={Boolean(errors.salary)}
                    helperText={errors.salary}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    error={Boolean(errors.dateOfBirth)}
                    helperText={errors.dateOfBirth}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleaddemployee}
                  >
                    Add Employee
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

export default Addemployee;
