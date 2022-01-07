MartinBinard_7_02122021
**Projet 7**

***GROUPOMANIA - A social network using VueJS, nodeJS, express, MySQL & Sequelize***

**Main branch - Commit #24**

# Description

* This website is a project to web developer course teached by [Openclassroom](https://openclassrooms.com/en/paths/141-web-developer)

* The entire project is made from scratch, only logos are delivered.
* I choose VueJS 3 for this project.

# Main goals

* Use a front-end javascript framework of my choice: VueJS
* Use SQL database manager : MySQL with Sequelize.

# Change done

* Add Login.vue & Signup.vue.

# Before to run this server

* Create a mySQL database called groupomania by default:
```
CREATE DATABASE groupomania;
```
* Rename .env.example into .env file loacted in backend folder.
* Then insert your parameters:
```
DB_NAME = INSERT DATABASE NAME
DB_USER = INSERT DATABASE USER
DB_USER_PASSWORD = INSERT DATABASE USER PASSWORD
DB_HOST = INSERT DATABASE HOST
DB_DIALECT = mysql
DB_PORT = 3306
APP_PORT = 3001

ADMIN_FIRSTNAME = INSERT ADMIN FIRST NAME
ADMIN_LASTNAME = INSERT ADMIN LASTNAME
ADMIN_EMAIL = INSERT ADMIN EMAIL
ADMIN_PASS = INSERT ADMIN PASSWORD
USER_CRYPTOJS_KEY = INSERT RADOM ASCII CHARACTER
SECRET_TOKEN = INSERT RANDOM ASCII CHARACTER
```
* Then create your own local database (named groupomania by default with root user).

# How to run this application

* Open the backend repo in a terminal and run :
```
npm install
```
* then : 
```
npm run start
```
* :warning: In order to prevent from port collisions, the API code port value is 3001 and the data base port value is 3306 by default.