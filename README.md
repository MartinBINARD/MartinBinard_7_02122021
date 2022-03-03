MartinBinard_7_02122021
**Projet 7**

***GROUPOMANIA - A social network using VueJS, nodeJS, express, MySQL & Sequelize***

**Main branch - Commit #61**

# Description

* This website is a project to web developer course teached by [Openclassroom](https://openclassrooms.com/en/paths/141-web-developer)

* The entire project is made from scratch, only logos are delivered.
* I choose VueJS 3 for this project.

# Main goals

* CSS style comments in post.
* Update README.md database instructions.

# Change done

* Debug like/dislike function in vue.
* Fix invalid login/password warning user.

# Before to run this server

* Create a mysql root user with password as : azerty or change it in the .env.example file.

* Then create a mySQL database called groupomania by default:
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
* Then create your own local database (named groupomania by default with root user & azerty password).

* In the root of the `/backend` folder, rename the folder called `/images.example` to `/images`.

# How to run this application

* Open terminal in both frontend and backend repos, then run the following commands :

* Install depedencies :
```
npm install
```
* Launch the 2 servers in each terminal (frontend & backend):
```
npm run start
```
* Then open this link: [http://localhost:8080/submit](http://localhost:8080/submit) in your favorite browser.

* :warning: In order to prevent from port collisions, the API code port value is 3001, the data base port value is 3306 by default and the frontend port value is 8080.