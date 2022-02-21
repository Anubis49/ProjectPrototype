from setting import *
from models import *
import datetime

employee_get_args = reqparse.RequestParser()
employee_get_args.add_argument('id',  			type=int,	help="get the id")
employee_get_args.add_argument('name',			type=str,	help="insert the name")

employee_post_args = reqparse.RequestParser()
employee_post_args.add_argument('name',			type=str,	help = "", required = True)
employee_post_args.add_argument('vaccinated',	type=int,	help = "", required = False)

employee_put_args = reqparse.RequestParser()
employee_put_args.add_argument('id',			type=int,	help = "", required = True)
employee_put_args.add_argument('name',			type=str,	help = "", required = True)
#employee_put_args.add_argument('vaccinated',	type=int,	help = "", required = True)

employee_delete_args = reqparse.RequestParser()
employee_delete_args.add_argument('id',			type=int,	help = "", required = True)


cors = CORS(app, resources={r"/*": {"origins": "*"}})

class default_api(Resource):
	__doc__ = 'default api'

	def get(self):
		args = employee_get_args.parse_args()
		results = employeeModel.query.all()
		json = []
		for result in results:
			json.append(result.output())
		return json , 201 , {'Access-Control-Allow-Origin': '*'}

	def post(self):
		args = employee_post_args.parse_args()
		#employee_vaccinated_bool = bool(args['vaccinated'])
		employee_vaccinated_bool = False
		employee = employeeModel(
			id = None,
			name = args['name'],
			vaccinated = employee_vaccinated_bool,
		)
		db.session.add(employee)
		db.session.commit()
		return employee.output(), 201 , {'Access-Control-Allow-Origin': '*'}

	def put(self):
		args = employee_put_args.parse_args()
		employee = employeeModel.query.filter_by(id = args['id']).first()
		employee.name = args['name']
		print(employee.output())
		db.session.add(employee)
		db.session.commit()
		return employee.output(), 201 , {'Access-Control-Allow-Origin': '*'}
		#employee.vaccinated = bool(args['vaccinated'])

	def delete(self):
		args = employee_delete_args.parse_args()
		employee = employeeModel.query.filter_by(id = args['id']).first()
		employeeDeleted = employee.output();
		employee.deleteTests()
		db.session.delete(employee)
		db.session.commit()
		return employeeDeleted , 201 , {'Access-Control-Allow-Origin': '*'}


test_post_args = reqparse.RequestParser()
test_post_args.add_argument('employee_id', 	type=int,	help = "employee id",	required = True)
test_post_args.add_argument('tested',		type=int,	help = "", 				required = True)

class tests_api(Resource):
	def post(self):
		args = test_post_args.parse_args()
		employee = employeeModel.query.filter_by(id = args['employee_id']).first()
		test = TestedModel(
			id = None,
			employee_id = employee.id,
			tested = bool(args['tested']),
			date = datetime.datetime.now().strftime("%Y-%m-%d")
		)
		db.session.add(test)
		db.session.commit()
		return test.output()

api.add_resource(default_api, "/")

if __name__ == '__main__':
	app.run(debug=True)