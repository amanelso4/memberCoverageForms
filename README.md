#Sun Life - Member Forms Manager
Developed: Summer 2019

###Stakeholders:

Name | Title
----- | ------
Jon Carter | Mentor
Steve Kouri | Mentor
Ashley Brin | Product Owner
Amanda Nelson | Developer
Evan Trout | Developer
Edward Fitzgerald | BSA


-------------------------------------

###Prerequisite Software
1. Git
2. Maven
3. Liberty Websphere

-------------------------------------

###Deployment Instructions

1. To download the project repository, open a command line and run:

   `git clone http://<ACF2>@bitbucket.us.sunlife/scm/intern/membercoverageforms.git`
   
   where `<ACF2>` is your ACF2 ID.

2. Navigate to the cloned repository and run `mvn install`.

3. When installation is completed (it will take a while), navigate to your WebSphere install location, then to the `bin` subfolder. 
   Run the command `server create <server_name>`, where `<server_name>` is your desired server name.

4. Open a file explorer and navigate to the `target` folder inside the repository you cloned in step 1.

5. Copy the file `MemberCoverageForms.war`.

6. Navigate to your WebSphere installation location, then to the `usr/servers/<server_name>/dropins` subfolder. Paste 
   the copied file here.
   
7. Return to your command prompt, confirm that you're still in the `bin` folder, and run the command `server run <server_name>`.

8. Wait until the server has finished launching; you'll see a line ending with:

   `com.sunlife.groupweb.member.Application : Started Application in ##.## seconds (JVM running for ##)`

9. In a browser, navigate to http://localhost:9080/MemberCoverageForms

10. When finished, shut down the server by pressing Ctrl+C in the command prompt.


--------------------------------------





