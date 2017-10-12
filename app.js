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

app.put('/student/:studentId/:newTeacherId', (req, res, next) => {
	const newTeacherId = req.params.newTeacherId
	Student.findById(req.params.studentId)
	.then( student => student.update({teacherId: +newTeacherId})
	.then(()=> res.sendStatus(204))
)
})

app.delete('/student/:studentId', (req, res, next) => {
	Student.destroy(
		{where: {id: req.params.studentId}
	})
	.then((affectedRow) => res.sendStatus(202))
})

db.sync({force:true})
.then(() => {
	console.log('db synced')
	app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

	const students = Promise.all([
		{name: 'Anita', gpa: 3.2},
		{name: 'Maria', gpa: 4.0},
		{name: 'Tony', gpa: 2.7},
		{name: 'Bernardo', gpa: 0},
	].map(data => Student.create(data)))

	const teachers = Promise.all([
		{name: 'John', subject: 'Math'},
		{name: 'Lueck', subject: 'English'}
	].map(data => Teacher.create(data)))

	Promise.all([students, teachers])
		.then(([
			[anita, maria, tony, bernardo],
			[john, lueck],
		]) => Promise.all([
			anita.setTeacher(john),
			tony.setTeacher(lueck),
			maria.setTeacher(lueck),
			john.addStudent(bernardo),
		]))
		.then(() => {
			console.log('database seeded.')
		})
});
