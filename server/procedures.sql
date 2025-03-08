CREATE OR REPLACE PROCEDURE newAttendance()
LANGUAGE SQL 
BEGIN ATOMIC 
  INSERT INTO attendance(employee_id)
  SELECT employee_id FROM EMPLOYEES;
END;

-- CALL newAttendance();

CREATE OR REPLACE PROCEDURE autoPayroll()
LANGUAGE plpgsql
AS $$
DECLARE
    emp_id INT;
    base_salary NUMERIC(10, 2);
    prev_month DATE := (CURRENT_DATE - INTERVAL '1 month')::DATE;
    days_in_prev_month INT := DATE_PART('days', (DATE_TRUNC('month', prev_month) + INTERVAL '1 month - 1 day')::DATE);
    per_day NUMERIC(10, 2);
    absent_days INT;
    final_pay NUMERIC(10, 2);
BEGIN
    -- Loop through all employees
    FOR emp_id, base_salary IN
        SELECT employee_id, salary FROM employees
    LOOP
        -- Calculate per day salary for the previous month and round it down
        per_day := FLOOR(base_salary / days_in_prev_month);

        -- Count the number of days the employee was absent in the previous month
        SELECT COUNT(*)
        INTO absent_days
        FROM attendance
        WHERE employee_id = emp_id
          AND attendance_status = 'ABSENT'
          AND DATE_PART('month', attendance_date) = DATE_PART('month', prev_month)
          AND DATE_PART('year', attendance_date) = DATE_PART('year', prev_month);

        -- Calculate the final pay after deductions for absences
        final_pay := base_salary - (absent_days * per_day);

        -- Insert the payroll record into the payroll table
        INSERT INTO payroll (employee_id, pay_date, base_salary, deductions, total_pay)
        VALUES (emp_id, CURRENT_DATE, base_salary, (absent_days * per_day), final_pay);
    END LOOP;
END;
$$;

-- CALL autoPayroll();