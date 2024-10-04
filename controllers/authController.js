const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const { body, validationResult } = require('express-validator');
const logger = require('../logger/logger'); 


dotenv.config();

const validateUserReg = [
   body('name').notEmpty().withMessage('Name is required'),
   body('email').notEmpty().withMessage('Email is required'),
   body('password').notEmpty().withMessage('Password is required'),
 ];

 const validateUserLogin = [
   body('email').notEmpty().withMessage('Email is required'),
   body('password').notEmpty().withMessage('Password is required'),
 ];


const register = async (req, res) => {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }


  const {name, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      logger.warn(`Registration failed: User with email ${email} already exists`); 
      return res.status(400).json({ error: 'User already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    logger.error(`Registration failed for email ${email}: ${error.message}`); 
    res.status(500).json({ error: 'Failed to register user' });

  }
};




const login = async (req, res) => {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }


  const { email, password } = req.body;

  try {

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });

  } catch (error) {

    res.status(500).json({ error: 'Failed to log in' });

  }
};

module.exports = { register, login ,validateUserReg ,validateUserLogin };
