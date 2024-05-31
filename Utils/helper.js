var bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function checkHashPassword(password,hashPassword) {
    const result = bcrypt.compareSync(password, hashPassword)
    return result
}

module.exports = {
    hashPassword,
    checkHashPassword,
};
