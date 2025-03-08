# HRMS
this is a simple HRMS system that allows attendence tracking, messaging, leave request management, and payroll management features. This project is build on the PERN (Postgre SQL, Express.js, React.js, Node.js) stack.

## HOW TO INITIALIZE PROJECT
1. setup the database (postgre) by running the DDL commands in server/creation_queries.sql in a new database.
2. for the automated salary and attendence, run the commands in server/procedures.sql in database.
3. setup cron for the automation of attendance and payroll management
4. add the cron jobs by running the sql commands in server/cron_setup.sql
5. open the server folder in terminal and run "npm install" to install the dependent node packages
6. open the client folder in terminal and run "npm install" to install the dependent node packages 
7. link the database with the project by entering database credentials in server/db.json
8. start the backend server by opening the folder server in terminal and then running "node index"
9. start the client side by opening the folder client in terminal and then running "npm start"

# DATABASE HELP
if u want a free database on cloud with cron and other features without having to setup the database locally, then checkout [SUPABASE](https://supabase.com/).