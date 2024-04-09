const { func } = require('joi');
const jwt = require('jsonwebtoken');

const secret = 'myCat';//debe estar como variable de entorno

const payload = {
  sub: 1,
  role: 'customer'
}

function signToken (secret,payload){
  return jwt.sign(payload,secret);
}

const token = signToken(secret,payload);

console.log(token);

