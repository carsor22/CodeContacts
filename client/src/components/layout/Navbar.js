import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

	const authLinks = (
		<ul>
			<li> 
			 <Link to='/dashboard'>
			  <span className="hide-sm">Dashboard</span>
			 </Link>
			</li>
			<li> 
			 <Link to='/profiles'>
				Developers
			 </Link>
			</li>
			<li> 
			 <Link to='/posts'>
				Blog
			 </Link>
			</li>
			<li>
				<a onClick= {logout} href= '#!'>
					<i className= 'fas fa-sign-out-alt' />{' '}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li> 
			 <Link to='/profiles'>
			  Developers
			 </Link>
			</li>
			<li>
				<a onClick= {logout} href= '#!'>
					<i className= 'fas fa-sign-out-alt' />{' '}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</ul>
	);

	return (
	
	<nav className= "navbar bg-dark">
		<h1> 
		<Link to = "/">
			CodeContacts
		</Link>
	</h1> 

	{ !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks}</Fragment>)}

	</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout }) (Navbar);