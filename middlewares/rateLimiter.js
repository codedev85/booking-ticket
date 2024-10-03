const rateLimit = require('express-rate-limit');


const createRateLimiter = (limit, timeWindow) => {
  return rateLimit({
    windowMs: timeWindow, 
    max: limit, 
    message: {
      error: 'Too many requests, please try again later.',
    },
  });
};

module.exports = { createRateLimiter };
