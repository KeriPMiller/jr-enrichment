const Sequelize = require('sequelize');


const db = new Sequelize('postgres://localhost/juniorenrichment', {
  logging: false
});


const Student = db.define("student" , {
	/* STUDENT MODEL CODE HERE */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gpa : {
    type: Sequelize.FLOAT
  },
  grade : {
    type: Sequelize.VIRTUAL,
    get () {
      return ['F', 'D', 'C', 'B', 'A'][Math.floor(this.gpa)]
    }
  }
})


Student.findPerfectScores = () => {
   return Student.findAll({
    where: {grade: 'A'}
  });
}


const Teacher = db.define('teacher', {
	/* TEACHER MODEL CODE HERE */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subject:{
    type: Sequelize.STRING,
  }

});


module.exports = {db, Student, Teacher}
