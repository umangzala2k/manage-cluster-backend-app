// app/Middleware/Cors.js
'use strict'

class Cors {
  async handle({ request, response }, next) {
    // Allow all origins for testing
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (request.method() === 'OPTIONS') {
      return response.status(200).send();
    }

    await next(); // Proceed to the next middleware
  }
}

module.exports = Cors;
