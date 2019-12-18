//middleware to access request and response object 

const jwt = require('jsonwebtoken'); 
const config = require('config'); 

module.exports = function(req,res,next) {
	//Get token from in header in protected route
	const token = req.header('x-auth-token');

	//check if token is passed through function

	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied'});
	}

	//verify token

	try {

		const decoded = jwt.verify(token , config.get('jwtSecret'));

		req.user = decoded.user; 
		next();

	} catch(err) {

		res.status(401).json ({msg: 'Token is not valid'});

	}
};