const bcrypt = require('bcryptjs');

/**
 * encode
 */
export function encrypt(password) {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, salt, 64);
  return '{bcrypt}' + hash;
}

/**
 * decode
 */
export function decrypt(password, hash) {
  if (hash.indexOf('{bcrypt}') === 0) {
    hash = hash.slice(8);
  }
  return bcrypt.compareSync(password, hash);
}
