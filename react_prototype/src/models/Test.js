import React from 'react';
import ReactDOM from 'react-dom';

export class Test extends React.Component 
{
	request_url = "http://127.0.0.1:5000/";
	constructor(props) {
		super(props);
		this.state = {
			postValue : "",
			error: null,
			items: [],
			value : [],
			postItem: {
				id : null,
				name : "",
				vaccinated : false,
			},
		};
		this.loadData = this.loadData.bind(this);
		this.changeEmployee_Submit = this.changeEmployee_Submit.bind(this);
		this.insertEmployee_Submit = this.insertEmployee_Submit.bind(this);

		this.changeEmployee_Change = this.changeEmployee_Change.bind(this);
		this.insertEmployee_Change = this.insertEmployee_Change.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	async loadData(){
		const response = await fetch(
			this.request_url,{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
			}
		).then(
			(response) => response.json()
		).then(
				(data) => this.setState(
					{items : data}
				)
		);
	}

	async postData(name) {
		
		const putURL = this.request_url + '?' + 'name=' + String(name);
		const response = await fetch(
			putURL, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
			}
		);
		response.json().then(
			(data) => {
				console.log(data)
			}
		);

		this.loadData();
	}

	async putData(id, name) {
		const putURL = this.request_url + '?' + 'id=' + String(id) + '&' + 'name=' + String(name) + '';
		const response = await fetch(
			putURL, {
				method: 'PUT',
				mode: 'cors',
				cache: 'no-cache',
			}
		);
		response.json().then(
			(data) => {
				console.log(data)
			}
		);

		this.loadData();
	}

	insertEmployee_Change(event){
		    this.setState({postValue: event.target.value});
	}

	insertEmployee_Submit(event){
		this.postData(String(this.state.postValue));
    	event.preventDefault();
	}

	changeEmployee_Change(event){

		this.setState(
			{
				value: {
					name : event.target.value,
					index : event.target.className,
					id : event.target.id,
				},
			}
		);
	}

	changeEmployee_Submit(event){
		this.putData(this.state.value.id, this.state.value.name);
		event.preventDefault();
	}

	render() {
		let list = this.state['items'];

		const listItems = this.state['items'].map(
			(item,index) =>{
				let listItemsVal;
				let listItemsID;
				if(this.state.value.index == index){
					listItemsVal = this.state.value.name;
				} else{
					listItemsVal = item.name;
				}
				return (
					<form key={'form' + '_' + String(index) } onSubmit={this.changeEmployee_Submit}>
						<label>
							Employee
							<input type="text" id={item.id} className={index} value={listItemsVal} onChange={this.changeEmployee_Change} />
						</label>
						<input type="submit" value="Submit" />
					</form>
				)
			}
		);

		return (
			<div>
				<form onSubmit={this.insertEmployee_Submit}>
					<label>
						Insert a new employee<br/>
						Name:
						<input type="text" value={this.state.postValue} onChange={this.insertEmployee_Change} />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<br/><br/>
				{listItems}
			</div>
		)
	}
}