const express = require('express');
const app = express();

const db = require('./db').db;
const Student = require('./db').Student;
const Teacher = require('./db').Teacher;

let PORT = 8080;

app.get("/test", (req, res, next) => {
	// Visit http://localhost:8080/test to see the message!
	res.send("Hello GET Route!")
})

app.get('/student/:studentId/', (req, res, next) => {
	const reqStudent = req.params.studentId
	Student.findById(reqStudent)
	.then( student => res.json(student))
})

app.get('/students', (req, res, next) => {
	Student.findAll()
	.then( students => res.json(students))
	console.log(Student.findPerfectScores());
})

app.get('/teachers/:teacherId/students', (req, res, next) => {
	const reqTeacher = req.params.teacherId
	Student.findAll(
		{where:{ teacherId: reqTeacher }
	})
	.then( students => res.json(students))
})

app.get('/teacher/:teacherId/', (req, res, next) => {
	const reqTeacher = req.params.teacherId
	Teacher.findById(reqTeacher)
	.then( teacher => res.json(teacher))
})

app.get('/teachers', (req, res, next) => {
	Teacher.findAll()
	.then( teachers => res.json(teachers))
})

app.delete('/student/:studentId', (req, res, next) => {
	Student.destroy(
		{where:{id:req.params.studentId}
	})
	.then(() => res.status(202))
})
db.sync()
.then(() => {
	console.log('db synced')
	app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
});
