import React from 'react';
import ReactDOM from 'react-dom';

export class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			items: [],
			postItem: {
				name : "",
				vaccinated : false,
			}
		};
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	async loadData(){
		const response = await fetch('http://127.0.0.1:5000/',{
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
		})
		.then((response) => response.json())
		.then(
				(data) => this.setState(
					{items : data}
				)
		);
	}

	async postData(url = '') {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
		});
		response.json().then(
			(data) => {
				console.log(data)
			}
		);

		this.loadData();
	}
	
	render() {
		let list = this.state['items'];
		console.log(list);
		console.log(this.state);

		const listItems = list.map((item) =>{
			return (
				<dl key="{item.id}">
					<dt key="{item.id}" >id: {item.id}</dt>
					<dt key="{item.name}" >name: {item.name}</dt>
					<dt key="{String(item.vaccinated)" >vaccinated: {String(item.vaccinated)}</dt>
					{
						item.tested.map((test) =>{
							return(
								<dd key={String(test.date)}>
									{"tested: " + String(test.tested) + '; '}
									{"date: " + String(test.date)}
								</dd>
							)
						})
					}
				</dl>
			)
		});

		return (
			<div>
				{listItems}
			</div>
		);
	}
}