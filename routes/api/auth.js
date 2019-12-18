const express = require('express'); 
const router = express.Router(); 
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken'); 
const config = require('config');
const { check, validationResult } = require('express-validator'); 
const bcrypt = require ('bcryptjs');

//@route GET api/auth
//@desc Test route 
//@access Public 



router.get('/', auth, async (req,res) => {

	try {

		const user = await User.findById(req.user.id).select('-password');
		res.json(user);

	} catch(err) {

		console.error(err.message);
		res.status(500).send('Server Error');
	}

});

//@route POST api/auth
//@desc Authentciate existing user & get token 
//@access Public 

//make requests to private routes 


router.post('/', 

	//details validation

	[

	check( 'email', 'Please include a valid email')
	.isEmail(), 
	check( 'password', 'Password Required')
	.isLength({ min: 6 }) 

	], 

	async (req, res) => {
	
	const errors = validationResult(req);
	
		if(!errors.isEmpty()){
		
		return res.status(400).json({errors: errors.array() });
	}

	const { email, password } = req.body; 

	//mongoose query

	try {

	//check user exists and run if not found

	let user = await User.findOne({ email });

	if(!user) {
		return res.status(400).json({errors: [{msg: 'Invalid Credentials'}] });
	}


	//use bcrypt compare method for matching password and email 

	const isMatch = await bcrypt.compare(password, user.password);


	if(!isMatch) {

		return res 
			.status(400)
			.json({errors: [{ msg: 'Invalid Credentials'}] }); 
	}

	const payload = {
		user: {
			id: user.id
		}
	};

	//verfiy user 

	jwt.sign(
		payload, 
		config.get('jwtSecret'),
		{ expiresIn: 360000 },

			(err,token) => {

			if(err) throw err;
			res.json({ token });
		});
	
	} catch (err) {

		console.error(err.message); 
		res.status(500).send('Server Error');
	
	}

}); 

module.exports = router;