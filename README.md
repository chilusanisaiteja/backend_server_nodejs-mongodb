How to start the server

1. First clone the repo and the open in vsc.
2. use command (npm install) to install all packages.
3. start the server using command : node server.js

project explaination:
1. first created a mongodb cluster then added data using modules mongoose and express.
2. created schema and model for college and student and then created a random data and uploaded in the database.
3.Two lines are commented(172,199) in the server.js which are to be exicuted only once otherwise data will be replicated in database.
4. connected to the mongodb atlas which is a cloud used to access from any device.
5. created get functions as per the requirements using mongoose and express.
6. localhost:4000 is the Port given for the server.
