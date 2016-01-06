# Survey
A Universal JavaScript React/Flux Survey application meant to showcase the use of the following tools:

- [Express](http://expressjs.com) 
- [SequelizeJS](http://docs.sequelizejs.com/en/latest/)
- [MySQL](https://www.mysql.com/)
- [React](https://facebook.github.io/react)
- [Alt](http://alt.js.org)

This website has a user component where guests answer survey questions, and an admin component where admins are able to add new survey questions and view survey results.

## Requirements
Create a MySQL database, by executing the following command:
```sh
mysql -uroot -e "CREATE DATABASE survey"
``` 

An .env file needs to be created in the project root, with the following attributes:
```sh
  DATABASE_URL=INSERTVARHERE
  JWT_SECRET=INSERTVARHERE
``` 
Where ```INSERTVARHERE``` is replaced with your own MySQL URI and JWT secret.

## Running Locally
After finishing the above requirements, execute the following commands:
```sh
  git clone https://github.com/dmayala/survey.git
  cd survey
  npm install
  npm run start
``` 
The application will run on http://localhost:3000

This is the default login for the Admin pages:
```sh
  username: admin
  password: root
``` 


