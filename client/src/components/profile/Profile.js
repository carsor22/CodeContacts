import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link }from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profile: { profile,loading}, auth, match }) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);

	return (
		<Fragment>
			{profile === null || loading ?( <Spinner /> ) : ( <Fragment>
				
				<Link to = '/profiles' className= 'btn btn-light'>
					Back to Profiles
				</Link> 
				{ auth.isAuthenticated && auth.loading ===false && auth.user._id === profile.user._id && (
					<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}

				<div class="profile-grid my-1"> 
					<ProfileTop profile={profile} />
					<ProfileAbout profile={profile} /> 
					<div className = "profile-exp bg-white p-2">
						<h3 className= 'text-primary'>Experience</h3>
						{profile.experience.length >0 ? (<Fragment>
							{profile.experience.map(experience =>(
							<ProfileExperience key={experience._id} experience={experience} />
						))}
					</Fragment>) : ( <h5>No experience credentials</h5>
          )}
					</div>
          <div className = "profile-edu bg-white p-2">
            <h3 className= 'text-primary'>Education</h3>
            {profile.education.length >0 ? (<Fragment>
              {profile.education.map(education =>(
              <ProfileEducation key={education._id} education={education} />
            ))}
          </Fragment>) : ( <h5>No education credentials</h5>
          )}
          </div>
            
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
		   </div>
		   </Fragment>
      )}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile:state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById})(Profile)