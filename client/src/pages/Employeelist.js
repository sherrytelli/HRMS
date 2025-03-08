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
import './Employeelist.css';

const Employeelist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const [employees, setemployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModeldata] = useState([]);

  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoaddemployee, setgotoaddemployee] = useState(false);
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

  const handlegotoupdatepage = async (employeeID, updateid) => {
    navigate('/hr-employeelist/updateemployee', { state: { employeeID: employeeID, updateid: updateid }});
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to perform this action?')) {
      const res = await fetch(`http://localhost:5000/getdepbymid/${id}`);
      const data = await res.json();

      console.log(data[0]?.department_id);

      if(data.length > 0) {
        console.log("inside manager null if");
        const response = await fetch(`http://localhost:5000/setmanagernull/${data[0]?.department_id}`, { method: "PUT" });
      }

      const respnose = await fetch(`http://localhost:5000/deleteemp/${id}`, { method: "DELETE" });

      if(respnose.ok) {
        get_employee_data();
      }
    }
  };

  const gotoaddemployeepage = async () => {
    setgotoaddemployee(true);
  };

  const get_employee_data = async () => {
    const respnose = await fetch(`http://localhost:5000/employeelist`);
    const data = await respnose.json();
    setemployees(data);
  };

  const updateGotoDashboard = async (e) => {
    setgotoDashboard(true);
    console.log("gotodashboard state changes to true");
  };

  useEffect(() => {
    if(gotoaddemployee){
      navigate('/hr-employeelist/addemployee', { state: { employeeID: employeeID}})
    }
  }, [employeeID, gotoaddemployee]);

  useEffect(() => {
    if(gotoDashboard){
      navigate('/hr-dashboard', { state: { employeeID: employeeID}});
    }
  }, [employeeID, gotoDashboard]);

  useEffect(() => {
      get_employee_data();
  }, []); 
  
  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month (0-based index)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //model handling codes
  const handleChange = async (eid) => {
    const respnose = await fetch(`http://localhost:5000/getmodeldata/${eid}`);
    const data = await respnose.json();
    setModeldata(data);
    setShowModal(true); // Open the modal
  };

  return (
    <Fragment>
      <div className="employee-page-container">
        <div className="sidebar">
          <List>
            <ListItem button="true" onClick={() => updateGotoDashboard()}> {/* Use button={true} to avoid warning */}
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button="true">
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
        {/* Main Content */}
        <div className="main-content">
            <div className="header">
            <h2>EMPLOYEE LIST</h2>
            <button className="add-new-button" onClick={() => gotoaddemployeepage()}>Add New</button>
            </div>
            <table className="employee-table">
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Role</th>
                    <th>Number</th>
                    <th>Joining-Date</th>
                    <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {employees.map(employee => (
                      <tr key={employee.employee_id}>
                          <td>{employee.employee_id}</td>
                          <td>{employee.full_name}</td>
                          <td>{employee.email}</td>
                          <td>{employee.role_title}</td>
                          <td>{employee.phone_number}</td>
                          <td>{formatDate(employee.hire_date)}</td>
                          <td>
                              <button className='history-button' onClick={() => handleChange(employee.employee_id)}>History</button>
                              <button className='update-button' onClick={() => handlegotoupdatepage(employeeID, employee.employee_id)}>Update</button>
                              <button className='delete-button' onClick={() => handleDelete(employee.employee_id)}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
            </table>
        </div>
      </div>

      {/* Modal for employee history */}
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Employee History</h4>
            </div>
            <div className="modal-body">
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>Change Date</th>
                    <th>Type</th>
                    <th>Previous</th>
                    <th>New</th>
                  </tr>
                </thead>
                <tbody>
                  {modelData.map((data) => (
                    <tr key={data.history_id}>
                      <td>{formatDate(data.change_date)}</td>
                      <td>{data.change_type}</td>
                      <td>{data.previous_value}</td>
                      <td>{data.new_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Employeelist;
