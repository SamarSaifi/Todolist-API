const basicAuth = require('express-basic-auth');

const auth = basicAuth({
  users: { 'admin': 'password' }, // In production, use environment variables
  challenge: true
});

module.exports = auth;