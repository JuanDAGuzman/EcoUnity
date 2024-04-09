const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$GhCEAVgyW4XusJpMjn2hzOJAteyVqj4uAlJwl1.nYsiMVU7JC8DuG';
  const isMatch = await bcrypt.compare(myPassword,hash);

  console.log(isMatch);
}

verifyPassword();
