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
import './Salaryhr.css';

const Salaryhr = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeID } = location.state || {};

  const [salaryData, setSalaryData] = useState([]);

  const [gotoDashboard, setgotoDashboard] = useState(false);
  const [gotoEmpList, setgotoEmplist] = useState(false);
  const [gotoDepList, setgotoDepList] = useState(false);
  const [gotoJobroles, setgotojobroles] = useState(false);
  const [gotoAtten, setgotoatten] = useState(false);
  const [gotoLeaves, setgotoLeaves] = useState(false);
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

  const getSalarydata = async (id) => {
    const response = await fetch(`http://localhost:5000/getsalary/${id}`);
    const data = await response.json();
    setSalaryData(data);
  };

  useEffect(() => {
    getSalarydata(employeeID);
  }, [employeeID]);

  const getPreviousMonthAndYear = (d) => {
    const today = new Date(d); // Get the current date
    let year = today.getFullYear(); // Get the current year
    let month = today.getMonth(); // Get the current month (0-11)
  
    // If the current month is January (0), subtracting 1 sets it to December (11 of the previous year)
    if (month === 0) {
      month = 12; // December
      year -= 1; // Previous year
    }
  
    // Format month to 2 digits (e.g., 01, 02, ... 12)
    const formattedMonth = month.toString().padStart(2, "0");
  
    // Return in mm/yyyy format
    return `${formattedMonth}/${year}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month (0-based index)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Fragment>
      <div className="salary-page-container">
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
            <ListItem button="true">
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
            <h2>SALARY</h2>
          </div>
          <table className="salary-table">
            <thead>
              <tr>
                <th>For (MM/YYYY)</th>
                <th>Generated On</th>
                <th>Base Salary</th>
                <th>Bonuses</th>
                <th>Deductions</th>
                <th>Total Pay</th>
              </tr>
            </thead>
            <tbody>
            {salaryData.map((entry) => (
              <tr key={entry.payroll_id}>
                <td>{getPreviousMonthAndYear(entry.pay_date)}</td>
                <td>{formatDate(entry.pay_date)}</td>
                <td>{entry.base_salary}</td>
                <td>{entry.bonuses}</td>
                <td>{entry.deductions}</td>
                <td>{entry.total_pay}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Salaryhr;
