const { pool } = require('../../data');

exports.register = async(email, password, name) => {
    const query = `INSERT INTO user(email, password, name) VALUES (?, ?, ?);`
    return await pool(query, [email, password, name]);
}

exports.login = async (email, password) => {
    const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
    const result = await pool(query, [email, password]);
    return (result.length < 0) ? null : result[0];
}

exports.findById = async (id) => {
    const query = `SELECT * FROM user WHERE id = ?`;
    const result = await pool(query, [id]);
    return (result.length < 0) ? null : result[0];
}