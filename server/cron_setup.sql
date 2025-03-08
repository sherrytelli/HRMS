select cron.schedule('auto-new-attendence', '0 1 * * 1-6', 'CALL newAttendance()');
-- select cron.unschedule('auto-new-attendence');

select cron.schedule('auto-new-payroll', '0 3 1 * *', 'CALL autoPayroll()');
-- select cron.unschedule('auto-new-payroll');