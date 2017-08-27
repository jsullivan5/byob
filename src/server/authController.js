require('dotenv').config();
const jwt = require('jsonwebtoken');

const getAuth = (req, res) => {
  console.log('--------------', req.body);
  // console.log(req);
  const email = req.body.email.toLowerCase();
  const appName = req.body.appName;
  const secret = process.env.SECRET_KEY;
  const admin = email.endsWith('turing.io') ? { admin: true } : null;

  const initPayload = {
    email,
    appName,
  };

  const finalPayload = Object.assign(initPayload, admin);
  const token = jwt.sign(finalPayload, secret, { expiresIn: '48h' });

  res.status(201).json({ token });
};

const checkAuth = (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  const token = req.body.token || req.params.token || req.headers.authorization;

  if (!token) {
    return res.status(403).send('You must have an authorization token');
  }
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.admin) {
      delete req.body.token;
      return next();
    }
    return res.status(403).send('You must be an administrator to use this endpoint');
  } catch (err) {
    return res.status(403).json({
      status: 'Invalid Credentials',
      error: err,
    });
  }
};

module.exports = {
  getAuth,
  checkAuth,
};
