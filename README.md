MartinBinard_7_02122021
**Projet 7**

***GROUPOMANIA - A social network using VueJS, nodeJS, express, MySQL & Sequelize***

**Main branch - Commit #83**

# Description

* This website is a project to web developer course teached by [Openclassroom](https://openclassrooms.com/en/paths/141-web-developer)

* The entire project is made from scratch, only logos are delivered.
* I choose VueJS 3 for this project.

# Main goals

* CSS style comments in post.
* Update README.md database instructions.

# Change done

* Add new instruction in README.md.

# Before to run this server

* Create a mysql root user with password as : azerty or change it in the .env.example file.

* Then, in a terminal, create a mySQL database called groupomania by default:
```
CREATE DATABASE groupomania;
```
* Rename .env.example into .env file loacted in backend folder.
* In the root of the `/backend` folder, rename the folder called `/images.example` to `/images`.
* Then insert your parameters:
```
DB_NAME = INSERT DATABASE NAME
DB_USER = INSERT DATABASE USER
DB_USER_PASSWORD = INSERT DATABASE USER PASSWORD
DB_HOST = INSERT DATABASE HOST
DB_DIALECT = mysql
DB_PORT = 3306
APP_PORT = 3001

USER_CRYPTOJS_KEY = INSERT RADOM ASCII CHARACTER
SECRET_TOKEN = INSERT RANDOM ASCII CHARACTER
```
* :warning: Create your own local database, named `groupomania` by default with `root` user & `azerty` password.

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

# How to create an admin user with root privileges :crown:

* In the dabase named `groupomania` by default insert this query:
```
UPDATE `users` SET `admin` = '1' WHERE `user_id` = '1';
```