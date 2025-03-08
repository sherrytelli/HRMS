import React, { Fragment, useEffect, useState }from 'react';
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
import './Departmentlist.css';

const Departmentlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const [departments, setdepartments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newManagerId, setNewManagerId] = useState("");
  const [emplist, setemplist] = useState([]);
  
  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoEmpList, setgotoEmplist] = useState(false);
  const [gotoaddDep, setgotoaddDep] = useState(false);
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

  const updategotoadddep = async () => {
    setgotoaddDep(true);
  };

  useEffect(() => {
    if(gotoaddDep){
      navigate('/hr-departmentlist/adddepartment', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoaddDep]);

  const updateGotoEmplist = async (e) => {
    setgotoEmplist(true);
    console.log("employeelist state changes to true");
  };

  useEffect(() => {
    if(gotoEmpList){
      navigate('/hr-employeelist', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoEmpList]);

  const get_department_data = async () => {
    const respnose = await fetch('http://localhost:5000/getdepinfo');
    const data = await respnose.json();
    setdepartments(data);
  };

  useEffect(() => {
    get_department_data();
  }, []);

  const updateGotoDashboard = async (e) => {
    setgotoDashboard(true);
    console.log("gotodashboard state changes to true");
  };

  useEffect(() => {
    if(gotoDashboard){
      navigate('/hr-dashboard', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoDashboard]);

  //model handling codes
  const handleChangeManager = (departmentId, currentManagerId) => {
    setSelectedDepartment(departmentId); // Set the selected department
    setNewManagerId(currentManagerId); // Set the current manager ID (for the form input)
    getemplist(departmentId);
    setShowModal(true); // Open the modal
  };
  
  const handleManagerChange = async () => {
    const response = await fetch(`http://localhost:5000/addmanager/${newManagerId}/${selectedDepartment}`, {method: "PUT"});
  
    if (response.ok) {
      // After successful manager update, refresh the department list
      get_department_data();
      setShowModal(false); // Close the modal
      setNewManagerId("");
      setSelectedDepartment(null);
    }
  };

  const getemplist = async (depID) => {
    const response = await fetch(`http://localhost:5000/getemp/${depID}`);
    const data = await response.json();
    setemplist(data);
  };

  const handleDelete = async (id) => {
    const respnose = await fetch(`http://localhost:5000/getemployees/${id}`)
    const data = await respnose.json();

    if(data.length > 0) {
      alert('Please remove all employees from the department before attempting to delete it.');
    }else {
      if(window.confirm('Are you sure you want to perform this action?')) {
        const respnose = await fetch(`http://localhost:5000/deletedep/${id}`, { method: "DELETE" });
  
        if(respnose.ok) {
          get_department_data();
        }
      }
    }
  };
  
  return (
    <Fragment>
      <div className="department-page-container">
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
            <ListItem button="true">
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
        {/* Main Content */}
        <div className="main-content">
            <div className="header">
            <h2>DEPARTMENT LIST</h2>
            <button className="add-new-button" onClick={() => updategotoadddep()}>Add New</button>
            </div>
            <table className="department-table">
              <thead>
                  <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department Manager</th>
                  <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {departments.map(department => (
                    <tr key={department.department_id}>
                        <td>{department.department_id}</td>
                        <td>{department.department_name}</td>
                        <td>{department.manager_id}</td>
                        <td> 
                          <button className="update-button" onClick={() => handleChangeManager(department.department_id, department.manager_id)}>Change Manager</button>
                          <button className='delete-button' onClick={() => handleDelete(department.department_id)}>Delete</button>
                        </td>
                    </tr>
                  ))}
              </tbody>
            </table>
        </div>
      </div>

      {/* Modal for Changing Manager */}
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Change Manager</h4>
            </div>
            <div className="modal-body">
              <label htmlFor="new-manager">New Manager ID:</label>
              <select value={newManagerId} onChange={(e) => setNewManagerId(e.target.value)}>
                <option disabled selected>Select employee</option>
                {emplist.map((emp) => (
                  <option key={emp.employee_id} value={emp.employee_id}>{`id: ${emp.employee_id} name: ${emp.full_name}`}</option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={() => handleManagerChange()}>Change Manager</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Departmentlist;
