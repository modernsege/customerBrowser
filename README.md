# customerBrowser
## Setup
1. Create a new MySQL database named customerBrowser
2. If host of your SQL server is different than localhost:3306 change it in application.properties file (line 2). You can also change database username and password (line 3 and 4)
3. Run server: (running application in Eclipse IDE)
- Import Spring boot project in Eclipse IDE (file->Import->Existing Maven Project->next).
- Select Root Directory as directory of "Backend" folder.
- Open CustomerBrowserAppApplication.java and click Run As -> Java Application.
4. You can insert example data into database using SQL instructions presented in initialiseDB.sql file in "Backend" folder
5. Run client application:
- To run the application you must have npm installed: `npm install`
- Run react app with `npm start` command in directory of "Frontend" folder 

