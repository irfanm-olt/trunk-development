const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Load User model
const Models = require("../models");

const User = Models.users;

// REGISTER
exports.register = (req, res) => {
	User.findAll({ where: { Email: req.body.email } }).then(userData => {
		if (userData.length != 0) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
				const newUser = {
					Name: req.body.name,
					Email: req.body.email,
					Password: req.body.password,
					Mobile: req.body.mobile,
					UserType: req.body.user_type,
					Status: 1
				};
				// Hash password before saving in database
				bcrypt.genSalt(10, (err, salt) => 
				{
					bcrypt.hash(newUser.Password, salt, (err, hash) => 
					{
						if (err) throw err;
							newUser.Password = hash;
							User.create(newUser)
								.then(data => {
									res.json(data);
								})
								.catch(err => {
							      res.status(500).send({
							        message:
							          err.message || "Some error occurred."
							      });
							    });
					});
				});
			}
	});
};

// LOGIN
exports.login = (req, res) => {

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ where: { Email: email } }).then((userData) => {
		// Check if user exists
		if (!userData) {
		  return res.status(404).json({ emailnotfound: "Acount does not exist" });
		}

		//Check password
		bcrypt.compare(password, userData.Password).then(isMatch => {
		  if (isMatch) {
		    // User matched
		    // Create JWT Payload
		    const payload = {
		      ID: userData.ID,
		      Name: userData.Name
		    };
			// Sign token
		    jwt.sign(
		      payload,
		      process.env.JWT_TOKEN || 'JWT_TOKEN',
		      {
		        expiresIn: 31556926 // 1 year in seconds
		      },
		      (err, token) => {
		        res.json({
		          success: true,
		          token: token
		        });
		      }
		    );
		  } else {
		    return res
		      .status(400)
		      .json({ passwordincorrect: "Password incorrect" });
		  }
		});
	});
};