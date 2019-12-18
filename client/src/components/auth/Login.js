import React, { Fragment, useState }  from 'react';
import { Link } from 'react-router-dom';


const Login = () => {

	//updating input and passing in values with set state 

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		console.log('Success');
	};

	return <Fragment>
	
	<h1 className = "large text-primary">
		Log In
	</h1>
	<p className="lead fas fa-user">Sign Into Your Account</p>

	<form className= "form" onSubmit={e => onSubmit(e)}>

		<div className = "form-group">
			<input 
			type="email" 
			placeholder="Email Address" 
			name = "email"
			value = {email} 
			onChange ={e => onChange(e)} required/>
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

		<input type= "submit" value="Login"
	 className="btn btn-primary" />
	
	</form>	

	<p className = "my-1"> 
		Don't have an account? <Link to ="/register.html">Sign Up</Link>
	</p>

	</Fragment>;

};

export default Login;