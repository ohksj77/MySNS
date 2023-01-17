const { pool } = require('../../data');

exports.create = async (name, path, size) => {
    const query = `INSERT INTO files(original_name, file_path, file_size) VALUES (?, ?, ?)`;
    return await pool(query, [name, path, size]);
}

exports.show = async (id) => {
    const query = `SELECT * FROM files WHERE id = ?`;
    let result = await pool(query, [id]);
    return (result.lenth < 0) ? null : result[0];
}
