# Junior Enrichment

## Sequelize

Write the necessary Sequelize for 2 models : Students and Teachers:

Students must have:

```
X- a name
X- a GPA
X- a teacherID for their corresponding teacher.
X- a method for giving a letter grade based on their GPA (4.0 == A, 3.0 == B, 2.0 == C etc).
X- A class method for getting all students with a perfect (4.0) GPA.
```

Teachers must have:
```
X - a name
X - a subject
```

## Express

Write the necessary Express routes for the following db interactions:

```
X- GET all students and return them in json
X- GET all teachers and return them in json
X- GET student by ID # and return a json of that student
X- GET teacher by ID # and return a json of that teacher
X- GET all students for a specific teacher's ID #
X- DELETE a student and return a status code of 202
X- UPDATE a student's teacher and return a status code of 204
```


This should complete a fully working API. Don't worry about having anything pretty in the browser, we just wanna see the proper results via CURL, Postman or Chrome Dev Tools. Feel free to look at the (Express Sequelize Checkpoint Prep Workshop)[https://learn.fullstackacademy.com/workshop/554a4f402cee9103007178dd/landing] for a high-level overview of these concepts, as well as the solution code for Twitter.JS and Wikistack

## Getting Started

```
	- npm install
	- open postgres
	- use postico or psql to add a database called 'juniorenrichment'
	- npm start (You should see a message saying your db synced and the server is listening on port 8080)
```

### Extra Notes: How to test functionality without a frontend
- GET: use your browser
- POST / PUT / DELETE :
 - CLI (command line interface) with `curl`
   - e.g. `curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login`
   - `-H`: headers. `-X`: verb. `-d`: data (must be of the type specified in headers). http://[address]:[port]/[route_path]
 - [Postman](https://www.getpostman.com/)
   ![](https://www.dropbox.com/s/4fk3b90cd0i1a5y/postman_post.png?raw=true)
- Databases: use Sequelize in your routes and see if you are receiving what you expect
