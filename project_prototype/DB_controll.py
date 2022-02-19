from models import *
#from setting import *

#init db

db.drop_all()
db.create_all()

#test datasets
db.session.add(
	employeeModel(
		id = None,
		name = 'rawr',
		vaccinated = False,
	)
)
db.session.add(
	TestedModel(
		id = None,
		employee_id = 1,
		date = "2020-12-11",
		tested = False
	)
)

db.session.add(
	TestedModel(
		id = None,
		employee_id = 1,
		date = "2020-12-10",
		tested = True
	)
)

db.session.commit()
db.session.close()