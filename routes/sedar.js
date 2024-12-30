const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { db } = require('../handlers/db.js');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require('multer');
const path = require('path')
const fs = require('node:fs')
const {logAudit} = require('../handlers/auditlog.js');
const nodemailer = require('nodemailer');
const { sendTestEmail } = require('../handlers/email.js');

/**
 * Middleware to verify if the user is an administrator.
 * Checks if the user object exists and if the user has admin privileges. If not, redirects to the
 * home page. If the user is an admin, proceeds to the next middleware or route handler.
 *
 * @param {Object} req - The request object, containing user data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware or route handler to be executed.
 * @returns {void} Either redirects or proceeds by calling next().
 */
function isAdmin(req, res, next) {
  if (!req.user || req.user.admin !== true) {
    return res.redirect('../');
  }
  next();
}

router.get('/scan/sedar/:id', isAdmin , async (req, res) => {
    const { id } = req.params;
 
     // Fetch the node from the database
     const node = await db.get(id + '_node');
 
     if (!node) {
       return res.status(404).json({ error: 'Node not found' });
     }
 });

 module.exports = router;