import React from 'react';
import ReactDOM from 'react-dom';

export class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			items: [],
			value : "",
			postItem: {
				id : null,
				name : "",
				vaccinated : false,
			},
		};
		this.loadData = this.loadData.bind(this);
	    this.changeEmployee_Change = this.changeEmployee_Change.bind(this);
	    this.changeEmployee_Submit = this.changeEmployee_Submit.bind(this);
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

	changeEmployee_Change(event){
		console.log(this.state);
		//event.target.className
		this.setState(
			state => {
				state.items[0].name = "Rubert"
			}
			);
	}

	changeEmployee_Submit(event){
		console.log(this.state.postItem);
		event.preventDefault();
	}

	render() {
		let list = this.state['items'];

		const listItems = this.state['items'].map((item,index) =>{
			//console.log(index);
			console.log(item.name);
			return (
				<form key={'form' + '_' + String(index) } onSubmit={this.changeEmployee_Submit}>
					<label>
						Employee
						<input type="text" className={index} value={item.name} onChange={this.changeEmployee_Change} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			)
		});

		return (
			<div>
				{listItems}
			</div>
		)
	}
}