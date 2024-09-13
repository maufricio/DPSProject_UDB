const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//Middleware para verificar si el usuario está logueado
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    
    jwt.verify(token, process.env.SECRET_KEY , (err, payload) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token',
        });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Token is not provided',
    });
  }
};

module.exports = {
    validateToken,
};

