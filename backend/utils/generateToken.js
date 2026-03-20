const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT token for the given user.
 * @param {Object} user - Mongoose user document
 * @returns {string} Signed JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
