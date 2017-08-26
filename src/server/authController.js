require('dotenv').config();
const jwt = require('jsonwebtoken');

const getAuth = (req, res) => {
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
