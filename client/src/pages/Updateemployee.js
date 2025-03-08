import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation, Await } from 'react-router-dom';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import './Updateemployee.css';
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

const Updateemployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID, updateid } = location.state || {};
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [departmentlist, setdepartmentlist] = useState([]);
  const [jobrolelist, setjobrolelist] = useState([]);

  const [prevdepartment, setprevDepartment] = useState("");
  const [prevrole, setprevRole] = useState("");
  const [prevsalary, setprevSalary] = useState("");

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

  const getemployeedetails = async () => {
    const respnose = await fetch(`http://localhost:5000/getempinfo/${updateid}`);
    const data = await respnose.json();
    setFirstName(data[0]?.first_name);
    setLastName(data[0]?.last_name);
    setEmail(data[0]?.email);
    setPhoneNumber(data[0]?.phone_number);
    const formattedDate = new Date(data[0]?.date_of_birth).toISOString().split("T")[0];
    setDateOfBirth(formattedDate);
    setDepartment(data[0]?.department_id);
    setRole(data[0]?.job_role_id);
    setSalary(data[0]?.salary);

    //setting values for previous dept, salary, jobrole
    setprevDepartment(data[0]?.department_id);
    setprevSalary(data[0]?.salary);
    setprevRole(data[0]?.job_role_id);
  };

  const handleUpdateemployee = async () => {
    const res = await fetch(`http://localhost:5000/getdepbymid/${updateid}`);
    const data = await res.json();

    console.log(data[0]?.department_id);

    if(data.length > 0) {
      console.log("inside manager null if");
      const response = await fetch(`http://localhost:5000/setmanagernull/${data[0]?.department_id}`, { method: "PUT" });
    }

    const response = await fetch(`http://localhost:5000/updateempinfo/${updateid}`, {
        method: "PUT",
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

    //add to employee history if department changed.
    if(prevdepartment !== department) {
      const response1 = await fetch(`http://localhost:5000/getdepname/${prevdepartment}`);
      const data1 = await response1.json();
      const prevdep_name = data1[0]?.department_name;
      const response2 = await fetch(`http://localhost:5000/getdepname/${department}`);
      const data2 = await response2.json();
      const dep_name = data2[0]?.department_name;

      const respnose = await fetch(`http://localhost:5000/updatehisdpt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updateid,
          prevdep_name,
          dep_name
        })
      });
    }

    //add to employee history if salary changed
    if(prevsalary !== salary) {
      const respnose = await fetch(`http://localhost:5000/updatehissal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updateid,
          prevsalary,
          salary
        })
      });
    }

    //add to employee history if jobroles changed
    if(prevrole !== role) {
      const response1 = await fetch(`http://localhost:5000/getjobtitle/${prevrole}`);
      const data1 = await response1.json();
      const prevrole_name = data1[0]?.role_title;
      const response2 = await fetch(`http://localhost:5000/getjobtitle/${role}`);
      const data2 = await response2.json();
      const role_name = data2[0]?.role_title;

      const respnose = await fetch(`http://localhost:5000/updatehisjr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updateid,
          prevrole_name,
          role_name
        })
      });
    }

    if(response.ok) {
      updateGotoEmplist();
    }
  }; 

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


  useEffect(() => {
    get_department_list();
    getemployeedetails();
  }, []);

  useEffect(() => {
    if(department){
        get_department_roles(department)
    }
  }, [department]);

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
              <h2>UPDATE EMPLOYEE INFO</h2>
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
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
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleUpdateemployee}
                  >
                    UPDATE EMPLOYEE
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

export default Updateemployee;
