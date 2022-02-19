from setting import *

class TestedModel(db.Model):
	''' Tested database model '''

	__tablename__ = 'Tested'
	id = db.Column(db.Integer, primary_key=True)
	employee_id = db.Column(db.Integer, db.ForeignKey('Employee.id'))
	tested = db.Column(db.Boolean, nullable=False)
	date = db.Column(db.Date, nullable=False)
	def output(self):
		return {'tested' : self.tested, 'date' : str(self.date)}


class employeeModel(db.Model):
	''' employee database Model '''

	__tablename__ = 'Employee'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(255), nullable=False)
	vaccinated = db.Column(db.Boolean, default=False, nullable=False)
	tested = db.relationship("TestedModel", lazy=True)
	def output(self):
		x = {
				'id' : self.id,
				'name' : self.name,
				'vaccinated' : self.vaccinated,
				'tested' : []
			}
		for test in self.tested:
			x['tested'].append(test.output())
		return x

	def deleteTests(self):
		Tests = TestedModel.query.filter_by(employee_id = self.id).all()
		for Test in Tests:
			db.session.delete(Test)
			db.session.commit()