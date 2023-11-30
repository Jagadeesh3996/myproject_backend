
const router = require('express').Router();
const users = require('../user.data/user.data');
const bcrypt = require('bcryptjs');

let user_data = [];

// Signup endpoint
router.route('/signup').post(async (req,res) => {
  try {
    const { name, email, password } = req.body;

    // Find user by email
    const existingUser = await users.findOne({ email: email });

    // Check if the email already exists in the database
    if (existingUser) {
      return res.json("exists")
    }else{

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new users({ name: name, email: email, password: hashedPassword });
      newUser.save()
      .then(() => res.json("created"))
      .catch(err => console.log(err))
    }
  } catch (error) {
    console.log('Error creating user');
  }
});
  
// Login endpoint
router.route('/login').post(async (req,res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await users.findOne({ email: email });

    // Check if the email already exists in the database
    if (!user) {
      return res.json('Invalid');
    }

    // Validate password  
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.json('Invalid');
    }else{
      // Store user data for Session
      user_data = user;
      res.json('Login');
    }
  } catch (error) {
    console.log('Error logging in');
  }
});

// Profile update endpoint
router.route('/profile').put(async (req,res) => {
  try {

    // Find user by email
    const user = await users.findOne({ email: user_data.email });

    // Check if the user is logged in
    if (user) {

      // Update user profile fields
      const { age, gender, dob, mobile, city} = req.body;
      users.findByIdAndUpdate(user_data._id, { age: age, gender: gender, dob: dob, mobile: mobile, city: city})
      .then(() => res.json('updated'))
      .catch(err => console.log(err))
    }else{  
      return res.json('Unauthorized');
    }
  } catch (error) {
    console.log('Error updating profile');
  }
});
  
// Logout endpoint
router.route('/logout').get(async(req,res) => {
  try{

    // Find user by email in user_data session
    const user = await users.findOne({ email: user_data.email });

    if(user){

      // Clearing the user_data session
      user_data = [];

      // User Logging out
      return res.json('logout');
    }else{
      res.json('Error');
    }
  } catch (error) {
    console.log('Error loging out profile');
  }
});

module.exports = router;