# customerBrowser
## Setup
#### 1. Create a new MySQL database named customerBrowser
#### 2. If host of your SQL server is different than localhost:3306 change it in application.properties file (line 2). You can also change database username and password (line 3 and 4)
#### 3. Run server: 
 1) option: running application in Eclipse IDE
 - Import Spring boot project in Eclipse IDE (file->Import->Existing Maven Project->next).
 - Select Root Directory as path of "backend" directory.
 - Open CustomerBrowserAppApplication.java and click Run As -> Java Application.
 2) option: running application using cmd (Maven installed on the computer is required):
 - In teminal, in "backend" directory path write `mvn install`
 - next `java -jar .\target\customerBrowserApp-0.0.1-SNAPSHOT.jar`
#### 5. You can insert example data into database using SQL instructions presented in initialiseDB.sql file in "backend" directory
#### 6. Run client application:
- To run the application you must have npm installed: `npm install`
- Run react app with `npm start` command in path of "frontend" directory

