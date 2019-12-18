import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

	//updating input and passing in values with set state 

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2:''
	});

	const { name, email, password, password2} = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if(password !== password2) {
			console.log('password does not match');
		} else {
			const newUser = {
				name,
				email,
				password
			}

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				}

				// connecting with back end route to recieve inputted data using axios
				const body = JSON.stringify(newUser);

				const res = await axios.post('/api/users', body , config);

				console.log(res.data);


			} catch (err) {
				console.error(err.response.data);
			}
		}
	};

	return <Fragment>
	
	<h1 className = "large text-primary">
		Sign Up 
	</h1>
	<p className="lead fas fa-user">Create an Account</p>

	<form className= "form" onSubmit={e => onSubmit(e)}>
		<div className = "form-group">
			<input 
			type="text" 
			placeholder="Name" 
			name="name" 
			value = {name} 
			onChange ={e => onChange(e)}
			required />
		</div>

		<div className = "form-group">
			<input 
			type="email" 
			placeholder="Email Address" 
			name = "email"
			value = {email} 
			onChange ={e => onChange(e)} required/>
			
			<small className="form-text">
				This site enables gravatar. 
			</small>
		</div>

		<div className = "form-group">
			<input 
			type="password" 
			placeholder="Password" 
			name= "password"
			value= {password}
			onChange ={e => onChange(e)} required
			minLength="6"/>
		</div>

		<div className = "form-group">
			<input 
			type="password" 
			placeholder="Confirm Password" 
			name= "password2"
			value= {password2}
			onChange ={e => onChange(e)} required
			minLength="6"/>

		</div>

		<input type= "submit" value="Register"
	 className="btn btn-primary" />
	
	</form>	

	<p className = "my-1"> 
		Already have an account? <Link to ="login.html">Log In</Link>
	</p>

	</Fragment>;

};

export default Register;