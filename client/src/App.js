import React, { Suspense, lazy, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Lazy loading routes
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Hrdashboard = lazy(() => import('./pages/Hrdashboard'));
const Employeelist = lazy(() => import('./pages/Employeelist'));
const Addemployee = lazy(() => import('./pages/Addemployee'));
const Updateemployee = lazy(() => import('./pages/Updateemployee'));
const Departmentlist = lazy(() => import('./pages/Departmentlist'));
const Jobroleslist = lazy(() => import('./pages/Jobroleslist'));
const Addjobrole = lazy(() => import('./pages/Addjobrole'));
const Adddepartment = lazy(() => import('./pages/Adddepartment'));
const Attendance = lazy(() => import('./pages/Attendance'));
const Leaves = lazy(() => import('./pages/Leaves'));
const Applyleaves = lazy(() => import('./pages/Applyleaves'));
const Hrleaves = lazy(() => import('./pages/Hrleaves'));
const Leavedetail = lazy(() => import('./pages/Leavedetails'));
const Empattendance = lazy(() => import('./pages/Empattendance'));
const Salaryhr = lazy(() => import('./pages/Salaryhr'));
const Salary = lazy(() => import('./pages/Salary'));
const Chat = lazy(() => import('./pages/Chat'));
const Chathr = lazy(() => import('./pages/Chathr'));

function App() {
  return (
    <Fragment>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/chat' element={<Chat />} />
            <Route path='/salary' element={<Salary />} />
            <Route path='/emp-attendance' element={<Empattendance />} />
            <Route path='/leaves/apply-leave' element={<Applyleaves />} />
            <Route path='/leaves' element={<Leaves />} />
            <Route path='/hr-chat' element={<Chathr />} />
            <Route path='/hr-salary' element={<Salaryhr />} />
            <Route path='/hr-leaves/detail' element={<Leavedetail />} />
            <Route path='/hr-leaves' element={<Hrleaves />} />
            <Route path='/hr-attendance' element={<Attendance />} />
            <Route path='/hr-departmentlist/adddepartment' element={<Adddepartment />} />
            <Route path='/hr-jobroleslist/addjobrole' element={<Addjobrole />} />
            <Route path='/hr-jobroleslist' element={<Jobroleslist />} />
            <Route path='/hr-departmentlist' element={<Departmentlist />} />
            <Route path='/hr-employeelist/updateemployee' element={<Updateemployee />} />
            <Route path='/hr-employeelist/addemployee' element={<Addemployee />} />
            <Route path='/hr-employeelist' element={<Employeelist />} />
            <Route path='/hr-dashboard' element={<Hrdashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' exact element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </Fragment>
  );
}

export default App;
