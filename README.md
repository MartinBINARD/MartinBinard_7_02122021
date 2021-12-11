MartinBinard_7_02122021
**Projet 7**

***GROUPOMANIA - A social network using VueJS, nodeJS, express, MySQL & Sequelize***

**Main branch - Commit #8**

# Description

* This website is a project to web developer course teached by [Openclassroom](https://openclassrooms.com/en/paths/141-web-developer)

* The entire project is made from scratch, only logos are delivered.
* I choose VueJS 

# Main goals

* Use a front-end javascript framework of my choice: VueJS
* Use SQL database manager : MySQL with Sequelize.

# Change done

* Add data persistence and auth routes to app.js
* Install brcrypt and crypto-js npm packages.

# Before to run this server

* Rename .env.example into .env file loacted in backend folder.
* Then insert your parameters:
```
DB_NAME = INSERT DATABASE NAME
DB_USER = INSERT DATABASE USER
DB_USER_PASSWORD = INSERT DATABASE USER PASSWORD
DB_PORT = 3006
DB_HOST = INSERT DATABASE HOST
DB_DIALECT = mysql

ADMIN_FIRSTNAME = INSERT ADMIN FIRST NAME
ADMIN_LASTNAME = INSERT ADMIN LASTNAME
ADMIN_EMAIL = INSERT ADMIN EMAIL
ADMIN_PASS = INSERT ADMIN PASSWORD
```

# How to run this application

* Open the backend repo in a terminal and run :
```
npm install
```
* then : 
```
npm run start
```
* :warning: In order to prevent from port collisions, the API code port value is 3000 and the data base port value is 3006 by default.