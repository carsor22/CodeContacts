import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import Spinner from '../layout/spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading} }) => {
	useEffect(() => {
	  getCurrentProfile();
}, [getCurrentProfile]);

	return loading && profile === null ? ( 

		<Spinner/> 

	) : ( 

	<Fragment> 

	<h1 className= "Large text-primary">Dashboard</h1>

	<p className="lead">

	<i className="fas fa-user"></i> Welcome {user && user.name}</p>

	{profile !== null ? (

	  <Fragment>has</Fragment> 

	  ) : (

	  <Fragment>
	  	<p>You have not yet set up a profile. Please add some info about you.</p>
	  	<Link to = '/create-profile' className='btn btn primary my-1'>
	  		Create Profile
	  	</Link>
	  </Fragment> 
	
	)}

	</Fragment> 
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps, 
	{ getCurrentProfile })
(Dashboard)