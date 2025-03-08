import React, { Fragment, useEffect, useState } from 'react';
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
import './Jobroleslist.css';

const Jobroleslist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const [jobrolelist, setjobrolelist] = useState([]);
  const [departmentlist, setdepartmentlist] = useState([]);
  const [depID, setdepID] = useState();
  const [depselected, setdepselected] = useState(false);

  const [gotoEmpList, setgotoEmplist] = useState(false);
  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoDepList, setgotoDepList] = useState(false);
  const [gotoAddjobrole, setgotoAddjobrole] = useState(false);
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

  const updategotoAddjobrole = async () => {
    if(depselected) {
      setgotoAddjobrole(true);
    }
  };

  useEffect(() => {
    if(gotoAddjobrole) {
      navigate('/hr-jobroleslist/addjobrole', { state: { employeeID: employeeID, depID: depID }});
    }
  }, [employeeID, depID, gotoAddjobrole]);

  const get_department_list = async () => {
    const response = await fetch(`http://localhost:5000/departmentlist`);
    const data = await response.json();
    setdepartmentlist(data);
  };

  useEffect(() => {
    get_department_list();
  }, []);

  const updateGotoDashboard = async (e) => {
    setgotoDashboard(true);
    console.log("gotodashboard state changes to true");
  };

  useEffect(() => {
    if (gotoDashboard) {
      navigate('/hr-dashboard', { state: { employeeID: employeeID } });
    }
  }, [employeeID, gotoDashboard]);

  const updateGotoEmplist = async (e) => {
    setgotoEmplist(true);
    console.log("employeelist state changes to true");
  };

  useEffect(() => {
    if (gotoEmpList) {
      navigate('/hr-employeelist', { state: { employeeID: employeeID } });
    }
  }, [employeeID, gotoEmpList]);

  const updateGotoDeplist = async (e) => {
    setgotoDepList(true);
  };

  useEffect(() => {
    if (gotoDepList) {
      navigate('/hr-departmentlist', { state: { employeeID: employeeID } });
    }
  }, [employeeID, gotoDepList]);

  const get_department_roles = async (department_id) => {
    const response = await fetch(`http://localhost:5000/jobroleinfo/${department_id}`);
    const data = await response.json();
    setjobrolelist(data);
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setdepID(selectedDepartment);
    console.log(selectedDepartment);
    setdepselected(true);
    get_department_roles(selectedDepartment);
  };

  const handleDelete = async (id) => {
    const respnose = await fetch(`http://localhost:5000/getemployeesj/${id}`)
    const data = await respnose.json();

    if(data.length > 0) {
      alert('Please remove all employees from the jobrole before attempting to delete it.');
    }else {
      if(window.confirm('Are you sure you want to perform this action?')) {
        const respnose = await fetch(`http://localhost:5000/deleterole/${id}`, { method: "DELETE" });
  
        if(respnose.ok) {
          get_department_roles(depID)
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="jobroles-page-container">
        <div className="sidebar">
          <List>
            <ListItem button="true" onClick={() => updateGotoDashboard()}>
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

        {/* Main content */}
        <div className="main-content">
          <div className="header">
            <h2>JOBROLES LIST</h2>
            <div className="header-right">
              <select className="add-new-select" value={depID} onChange={handleDepartmentChange}>
                <option disabled selected>Select Department</option>
                {departmentlist.map((dept) => (
                  <option key={dept.department_id} value={dept.department_id}>{dept.department_name}</option>
                ))}
              </select>
              <button className="add-new-button" onClick={() => updategotoAddjobrole()}>Add Role</button>
            </div>
          </div>
          <table className="jobroles-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobrolelist.map((role) => (
                <tr key={role.job_role_id}>
                  <td>{role.job_role_id}</td>
                  <td>{role.role_title}</td>
                  <td>{role.role_description}</td>
                  <td>
                    <button className='delete-button' onClick={() => handleDelete(role.job_role_id)}>delete</button>
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

export default Jobroleslist;
