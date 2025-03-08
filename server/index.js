const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//creating queries to fetch data from databse.

//getting login data from form to validate
app.get("/get-login/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select l.password_hash, d.department_name from employees e inner join departments d on e.department_id = d.department_id inner join login_info l on e.employee_id = l.employee_id where e.employee_id = $1;", [id])
        res.json(data.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//get query for getting dashboard_data for employee
app.get("/dashboard/:id", async (req, res) => {
    try {
        const { id } = req.params
        const data = await pool.query("select e.first_name||' '||e.last_name as full_name, d.department_name from employees e inner join departments d on e.department_id = d.department_id where e.employee_id = $1;", [id]);
        res.json(data.rows)
    } catch (err) {
        console.log(err.message);
    }
})

//query to get list of employees/
app.get("/employeelist", async (req, res) => {
    try {
        const data = await pool.query("select e.employee_id, e.first_name||' '||e.last_name as full_name, e.email, j.role_title, e.phone_number, e.hire_date from employees e inner join job_roles j on e.job_role_id = j.job_role_id;");
        res.json(data.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//query to get department list and number.
app.get("/departmentlist", async (req, res) => {
    try {
        const data = await pool.query("select department_id, department_name from departments;");
        res.json(data.rows);
    }catch(err) {
        console.log(err.message);
    }
})

//query to get jobroles according to the deparment_id
app.get('/getroles/:did', async (req, res) => {
    try {
        const { did } = req.params;
        const data = await pool.query("select job_role_id, role_title from job_roles where department_id = $1;", [did]);
        res.json(data.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//query to add new employee into database
app.post('/addemployee', async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, dateOfBirth, department, role, salary } = req.body;
        const newemp = await pool.query("insert into employees(first_name, last_name, email, phone_number, date_of_birth, department_id, job_role_id, salary)values($1, $2, $3, $4, to_date($5, 'YYYY-MM-DD'), $6, $7, $8);", [firstName, lastName, email, phoneNumber, dateOfBirth, department, role, salary]);
        res.json(newemp);
    } catch (err) {
        console.log(err);
    }
})

//query to get employee data
app.get('/getempinfo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select first_name, last_name, email, phone_number, date_of_birth, department_id, job_role_id, salary from employees where employee_id = $1", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//update query for update employee info
app.put('/updateempinfo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phoneNumber, dateOfBirth, department, role, salary } = req.body;
        const updatedemp = await pool.query("update employees set first_name = $2, last_name = $3, email = $4, phone_number = $5, date_of_birth = to_date($6, 'YYYY-MM-DD'), department_id = $7, job_role_id = $8, salary = $9 where employee_id = $1",
            [id, firstName, lastName, email, phoneNumber, dateOfBirth, department, role, salary]
        );
        res.json(updatedemp);
    } catch (err) {
        console.log();
    }
}) 

//query to fetch departments data
app.get('/getdepinfo', async (req, res) => {
    try {
        const data = await pool.query("select * from departments;");
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch all jobrole details
app.get('/jobroleinfo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select * from job_roles where department_id = $1;", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to get employee_id of the newly added employee.
app.get('/newempid', async (req, res) => {
    try {
        const data = await pool.query("select employee_id from employees order by employee_id desc limit 1");
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to insert new employee login info
app.post('/newlogininfo', async (req, res) => {
    try {
        const { newempid, password } = req.body;
        const update = await pool.query("insert into login_info(employee_id, password_hash) values ($1, $2)", [newempid, password]);
        res.json(update.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to add newjobrole for department
app.post('/addjobrole', async (req, res) => {
    try {
        const {roleTitle, roleDescription, depID } = req.body;
        const newrole = await pool.query("insert into job_roles(role_title, role_description, department_id) values ($1, $2, $3);", [roleTitle, roleDescription, depID]);
        res.json(newrole.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to add new department
app.post('/adddepartment', async (req, res) => {
    try {
        const { depName } = req.body;
        const newdep = await pool.query("insert into departments(department_name) values ($1)", [depName]);
        res.json(newdep.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch leave requests for hr
app.get('/getleaverequests', async (req, res) => {
    try {
        const data = await pool.query("select l.leave_request_id, e.first_name||' '||e.last_name as full_name, l.leave_type, l.leave_status from leave_requests l inner join employees e on e.employee_id = l.employee_id inner join departments d on e.department_id = d.department_id order by leave_request_id desc;");
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch leave request details for a particular leave_request_id
app.get('/getleavedetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select e.first_name||' '||e.last_name as full_name, d.department_name, l.leave_type, l.decription, l.leave_start_date, l.leave_end_date, l.leave_status from leave_requests l inner join employees e on l.employee_id = e.employee_id inner join departments d on e.department_id = d.department_id where l.leave_request_id = $1", 
            [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to update leave status to accepted
app.put('/acceptleave/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = await pool.query("update leave_requests set leave_status = 'accepted' where leave_request_id = $1", [id]);
        res.json(update.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to update leave status to rejected
app.put('/rejectleave/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = await pool.query("update leave_requests set leave_status = 'rejected' where leave_request_id = $1", [id]);
        res.json(update.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to get leave requests for a specific employee
app.get('/getleaves/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select leave_request_id, leave_type, leave_start_date, leave_end_date, leave_status from leave_requests where employee_id = $1 order by leave_request_id desc", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to insert new leave for a employee
app.post('/newleave', async (req, res) => {
    try {
        const { employeeID, leaveType, startDate, endDate, description } = req.body;
        const newreq = await pool.query("insert into leave_requests(employee_id, leave_type, leave_start_date, leave_end_date, decription) values($1, $2, to_date($3, 'YYYY-MM-DD'), to_date($4, 'YYYY-MM-DD'), $5);",
            [employeeID, leaveType, startDate, endDate, description]
        );
        res.json(newreq.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch employees according to dept
app.get('/getemp/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select employee_id, first_name||' '||last_name as full_name from employees where department_id = $1;", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
}) 

//query to add manager to department
app.put('/addmanager/:eid/:did', async (req, res) => {
    try {
        const { eid, did } = req.params;
        const newmanager = await pool.query("update departments set manager_id = $1 where department_id = $2;", [eid, did]);
        res.json(newmanager.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch messages for a particular employee
app.get('/getmessages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select * from messages where sender_id = $1 or receiver_id = $1;", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to insert new message for a particular employee.
app.post("/newmessage", async (req, res) => {
    try {
        const { employeeID, rid, messageText, sent_at } = req.body;
        const newMessage = await pool.query("insert into messages(sender_id, receiver_id, message_content, sent_at) values($1, $2, $3, $4);", [employeeID, rid, messageText, sent_at]);
        res.json(newMessage);
    } catch (err) {
        console.log(err);
    }
})

//query to delete employee and all its accociated details.
app.delete('/deleteemp/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await pool.query("delete from employees where employee_id = $1", [id]);
        res.json(deleted.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to delete department and its related jobroles.
app.delete('/deletedep/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await pool.query("delete from departments where department_id = $1", [id]);
        res.json(deleted.rows);
    } catch (err) {
        console.log(err);
    }
})

//fetching employees for a particular department.
app.get('/getemployees/:did', async (req, res) => {
    try {
        const { did } = req.params;
        const data = await pool.query("select employee_id from employees where department_id = $1", [did]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//fetching employees for a particular jobrole.
app.get('/getemployeesj/:jid', async (req, res) => {
    try {
        const { jid } = req.params;
        const data = await pool.query("select employee_id from employees where job_role_id = $1", [jid]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to delete a particular jobrole
app.delete('/deleterole/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await pool.query("delete from job_roles where job_role_id = $1", [id]);
        res.json(deleted.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to grt department name according to manager id
app.get("/getdepbymid/:mid", async (req, res) => {
    try {
        const { mid } = req.params;
        const data = await pool.query("select department_id from departments where manager_id = $1;", [mid]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to set department manager to null
app.put("/setmanagernull/:did", async (req, res) => {
    try {
        const { did } = req.params;
        const update = await pool.query("update departments set manager_id = null where department_id = $1;", [did]);
        res.json(update.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to verify that a employee of a particular id exists.
app.get('/verify/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select employee_id from employees where employee_id = $1;", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch data for history model
app.get('/getmodeldata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select history_id, change_date, change_type, previous_value, new_value from employee_history where employee_id = $1", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch details related to history for employee
app.get('/getdepname/:did', async (req, res) => {
    try {
        const { did } = req.params;
        const data = await pool.query("select department_name from departments where department_id = $1", [did]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

app.get('/getjobtitle/:jid', async (req, res) => {
    try {
        const { jid } = req.params;
        const data = await pool.query("select role_title from job_roles where job_role_id = $1", [jid]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to add new employee dept to employee_history
app.post('/newemphisdpt', async (req, res) => {
    try {
        const { id, dep_name } = req.body;
        const newdata = await pool.query("insert into employee_history(employee_id, change_type, new_value) values ($1, 'DEPT', $2)", [id, dep_name]);
        res.json(newdata.rows);
     } catch (err) {
        console.log(err);
    }
})

//query to add new employee salary to employee_history
app.post('/newemphissal', async (req, res) => {
    try {
        const { id, salary } = req.body;
        const newdata = await pool.query("insert into employee_history(employee_id, change_type, new_value) values ($1, 'SALARY', $2)", [id, salary]);
        res.json(newdata.rows);
     } catch (err) {
        console.log(err);
    }
})

//query to add new employee salary to employee_history
app.post('/newemphisjr', async (req, res) => {
    try {
        const { id, role_name } = req.body;
        const newdata = await pool.query("insert into employee_history(employee_id, change_type, new_value) values ($1, 'JOBROLE', $2)", [id, role_name]);
        res.json(newdata.rows);
     } catch (err) {
        console.log(err);
    }
})

//query to insert new employee history department
app.post('/updatehisdpt', async (req, res) => {
    try {
        const { updateid, prevdep_name, dep_name } = req.body;
        const newdata = await pool.query("insert into employee_history(employee_id, change_type, previous_value, new_value) values ($1, 'DEPT', $2, $3)", [updateid, prevdep_name, dep_name]);
        res.json(newdata.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to insert new employee history salary
app.post('/updatehissal', async (req, res) => {
    try {
        const { updateid, prevsalary, salary } = req.body;
        const newdata = await pool.query("insert into employee_history(employee_id, change_type, previous_value, new_value) values ($1, 'SALARY', $2, $3)", [updateid, prevsalary, salary]);
        res.json(newdata.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to insert new employee history jobrole
app.post('/updatehisjr', async (req, res) => {
    try {
        const { updateid, prevrole_name, role_name } = req.body;
        const newdata = await pool.query("insert into employee_history(employee_id, change_type, previous_value, new_value) values ($1, 'JOBROLE', $2, $3)", [updateid, prevrole_name, role_name]);
        res.json(newdata.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to fetch attendance data for a particular employee
app.get('/getatten/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newdata = await pool.query("select attendance_date, attendance_status from attendance where employee_id = $1 order by attendance_date desc limit 15;", [id]);
        res.json(newdata.rows);
    } catch (err) {
        console.log(err);
    }
})

//query to update attendance status when logging in.
app.put('/markpresent', async (req, res) => {
    try {
        const { eID, date } = req.body;
        const updated = await pool.query("update attendance set attendance_status = 'PRESENT' where employee_id = $1 and attendance_date = to_date($2, 'YYYY-MM-DD');", [eID, date]);
        res.json(updated);
    } catch (err) {
        console.log(err);
    }
})

//query to retrieve salary data for particular employee
app.get('/getsalary/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select payroll_id, pay_date, base_salary, bonuses, deductions, total_pay from payroll where employee_id = $1 order by pay_date desc limit 15;", [id]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
    }
})

app.listen(5000, () => {
    console.log("the server is working in port 5000");
})