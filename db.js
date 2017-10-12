const Sequelize = require('sequelize');


const db = new Sequelize('postgres://localhost/juniorenrichment', {
  logging: false
});


const Student = db.define("student", {
  /* STUDENT MODEL CODE HERE */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gpa: {
    type: Sequelize.FLOAT
  },
  grade: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return ['F', 'D', 'C', 'B', 'A'][Math.floor(this.gpa)]
    }
  }
},{
//   // getter, instance class methods hooks in their own objs
//   getterMethods : {
//     function findPerfectScores(){
//       return Student.findAll({
//         where: {gpa: 4}
//       });
//     }
})


Student.findPerfectScores = function() {
  return Student.findAll({
    where: {
      gpa: 4
    }
  });
}


const Teacher = db.define('teacher', {
  /* TEACHER MODEL CODE HERE */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING
  }
});

Teacher.hasMany(Student);
Student.belongsTo(Teacher);


module.exports = {
  db,
  Student,
  Teacher
}
