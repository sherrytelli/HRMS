-- 1. Employees Table
CREATE TABLE employees (
    employee_id SERIAL CONSTRAINT employee_pk PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    hire_date DATE DEFAULT CURRENT_DATE NOT NULL,
    date_of_birth DATE NOT NULL,
    department_id INT,
    job_role_id INT,
    salary NUMERIC(10, 2) NOT NULL
);

-- 2. Departments Table
CREATE TABLE departments (
    department_id SERIAL CONSTRAINT department_pk PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    manager_id INT
);

-- 3. Job Roles Table
CREATE TABLE job_roles (
    job_role_id SERIAL CONSTRAINT job_role_pk PRIMARY KEY,
    role_title VARCHAR(20) NOT NULL,
    role_description VARCHAR(80),
    department_id INT
);

-- 4. Payroll Table
CREATE TABLE payroll (
    payroll_id SERIAL CONSTRAINT payroll_pk PRIMARY KEY,
    employee_id INT NOT NULL,
    pay_date DATE NOT NULL,
    base_salary NUMERIC(10, 2) NOT NULL,
    bonuses NUMERIC(10, 2) DEFAULT 0,
    deductions NUMERIC(10, 2) DEFAULT 0,
    total_pay NUMERIC(10, 2) NOT NULL
);

-- 5. Attendance Table
CREATE TABLE attendance (
    attendance_id SERIAL CONSTRAINT attendance_pk PRIMARY KEY,
    employee_id INT NOT NULL,
    attendance_date DATE DEFAULT CURRENT_DATE NOT NULL,
    attendance_status VARCHAR(10) DEFAULT 'ABSENT' NOT NULL
);

-- 6. Leave Requests Table
CREATE TABLE leave_requests (
    leave_request_id SERIAL CONSTRAINT leave_requests_pk PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    leave_start_date DATE NOT NULL,
    leave_end_date DATE NOT NULL,
    leave_status VARCHAR(20) DEFAULT 'pending' NOT NULL
);

-- 7. Messages Table
CREATE TABLE messages (
    message_id SERIAL CONSTRAINT messages_pk PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 8. Training Programs Table
CREATE TABLE training_programs (
    training_program_id SERIAL CONSTRAINT training_programs_pk PRIMARY KEY,
    program_name VARCHAR(100) NOT NULL,
    program_description TEXT NOT NULL,
    program_start_date DATE NOT NULL,
    program_end_date DATE NOT NULL,
    instructor_id INT NOT NULL,
    program_location VARCHAR(100) NOT NULL
);

-- 9. Employee Training Table
CREATE TABLE employee_training (
    employee_training_id SERIAL CONSTRAINT employee_training_pk PRIMARY KEY,
    employee_id INT NOT NULL,
    training_program_id INT NOT NULL,
    completion_status VARCHAR(20) DEFAULT 'incomplete' NOT NULL,
    completion_date DATE
);

-- 10. Employee History Table
CREATE TABLE employee_history (
    history_id SERIAL CONSTRAINT employee_history_pk PRIMARY KEY,
    employee_id INT NOT NULL,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    change_type VARCHAR(100) NOT NULL,
    previous_value VARCHAR(100),
    new_value VARCHAR(100) NOT NULL
);

-- 11. Awards and Recognition Table
CREATE TABLE awards_recognition (
    award_id SERIAL CONSTRAINT awards_recognition_pk PRIMARY KEY,
    employee_id INT NOT NULL,
    award_name VARCHAR(100) NOT NULL,
    award_date DATE NOT NULL
);

-- 12. Feedback Table
CREATE TABLE feedback (
    feedback_id SERIAL CONSTRAINT feedback_pk PRIMARY KEY,
    employee_id INT,
    feedback_type VARCHAR(100) NOT NULL,
    feedback_text TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    feedback_status VARCHAR(20) DEFAULT 'open' NOT NULL
);

-- 13. Login Table
CREATE TABLE login_info (
    employee_id INT NOT NULL,
    password_hash VARCHAR(10) NOT NULL,
    CHECK (LENGTH(password_hash) = 10)  -- Ensures exactly 10 characters
);

ALTER TABLE login_info
ADD CONSTRAINT login_info_pk PRIMARY KEY (employee_id, password_hash);

--relations added using update.

-- 1. Add Foreign Key Constraints for Employees Table
ALTER TABLE employees
ADD CONSTRAINT fk_employees_department
    FOREIGN KEY (department_id) REFERENCES departments(department_id);

ALTER TABLE employees
ADD CONSTRAINT fk_employees_job_role
    FOREIGN KEY (job_role_id) REFERENCES job_roles(job_role_id);

-- 2. Add Foreign Key Constraints for Departments Table
ALTER TABLE departments
ADD CONSTRAINT fk_departments_manager
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
    ON DELETE SET NULL;

-- 3. Add Foreign Key Constraints for Job Roles Table
ALTER TABLE job_roles
ADD CONSTRAINT fk_job_roles_department
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
    ON DELETE CASCADE;

-- 4. Add Foreign Key Constraints for Payroll Table
ALTER TABLE payroll
ADD CONSTRAINT fk_payroll_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

-- 5. Add Foreign Key Constraints for Attendance Table
ALTER TABLE attendance
ADD CONSTRAINT fk_attendance_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

-- 6. Add Foreign Key Constraints for Leave Requests Table
ALTER TABLE leave_requests
ADD CONSTRAINT fk_leave_requests_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

-- 7. Add Foreign Key Constraints for Messages Table
ALTER TABLE messages
ADD CONSTRAINT fk_messages_sender
    FOREIGN KEY (sender_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

ALTER TABLE messages
ADD CONSTRAINT fk_messages_receiver
    FOREIGN KEY (receiver_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

-- 8. Add Foreign Key Constraints for Training Programs Table
ALTER TABLE training_programs
ADD CONSTRAINT fk_training_programs_instructor
    FOREIGN KEY (instructor_id) REFERENCES employees(employee_id);

-- 9. Add Foreign Key Constraints for Employee Training Table
ALTER TABLE employee_training
ADD CONSTRAINT fk_employee_training_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

ALTER TABLE employee_training
ADD CONSTRAINT fk_employee_training_program
    FOREIGN KEY (training_program_id) REFERENCES training_programs(training_program_id);

-- 10. Add Foreign Key Constraints for Employee History Table
ALTER TABLE employee_history
ADD CONSTRAINT fk_employee_history_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

-- 11. Add Foreign Key Constraints for Awards and Recognition Table
ALTER TABLE awards_recognition
ADD CONSTRAINT fk_awards_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

-- 12. Add Foreign Key Constraints for Feedback Table
ALTER TABLE feedback
ADD CONSTRAINT fk_feedback_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;

-- 13. Add Foreign Key Constraints for login_info Table
ALTER TABLE login_info
ADD CONSTRAINT fk_login_employee 
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE;