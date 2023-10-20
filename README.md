**_GROUPOMANIA - A private social network using Quasar, VueJS 3_**

**Main branch - Commit #114**

# Description

- This website is a project to web developer course teached by [Openclassroom](https://openclassrooms.com/en/paths/141-web-developer)
- Build a full-stack private social network for a company called Groupomania.
- The entire project is made from scratch, only logos are delivered.
- :warning: A new front-end made with Quasar is in progress. :construction:

# Watch on Youtube

[![groupomania screenshot](./groupomania_screenshot.png)](https://www.youtube.com/watch?v=3EP2cDBHx0U "Watch Groupomania on Youtube")

# Main goals

- A new frontend is being build with Quasar ( VueJS 3, VueX ). :construction:

# Change done

- Split Frontend and Backend in 2 github repo.

# Before to run this application

- Install MariaDB groupomania data and backend repo

[Backend repo](https://github.com/MartinBINARD/backend-social-network)

- In the .env frontend file, insert your parameters:

```
VUE_APP_API_PORT = 3001
```

- :warning: VUE_APP_API_PORT value must be equal to APP_PORT one.

# How to run this application

- Open terminal in repo, then run the following commands :

- Install depedencies :

```
npm install
```

- Launch frontend-quasar separately if you want to test the new frontend application :construction: :

```
npm run dev
```

- Then open this link: [http://localhost:8080/submit](http://localhost:8080/submit) in your favorite browser.

- :warning: In order to prevent from port collisions, the API code port value is 3001, the data base port value is 3306 by default and the frontend port value is 8080.
