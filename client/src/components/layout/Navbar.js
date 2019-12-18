import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
	
	<nav className= "navbar bg-dark">
		<h1> 
		<Link to = "/">
			<i className ="fas fa-spider"/>CodeContacts
		</Link>
	</h1> 

	</nav>
	)
}

export default Navbar;