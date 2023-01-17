const { pool } = require('../../data');
const {isNewFeed} = require("../../common/formatter/date");

exports.findAll = async () => {
    const query = `SELECT * FROM feed`;
    let result = await pool(query, []);
    if (result.length < 0) {
        return null;
    } else {
        result.forEach(feed => {
            feed.is_new_feed = isNewFeed(feed.created_at);
        })
        return result;
    }
}

exports.create = async (user_id, image_id, content) => {
    const query = `INSERT INTO feed(user_id, image_id, content) VALUES (?, ?, ?)`;
    return await pool(query, [user_id, image_id, content]);
}

exports.show = async (id) => {
    const query = `SELECT * FROM feed WHERE id = ?`;
    let result = await pool(query, [id]);
    return (result.lenth < 0) ? null : result[0];
}

exports.update = async (id, user_id, image_id, content) => {
    const query = `UPDATE feed set user_id = ?, image_id = ?, content = ? WHERE id = ?`;
    return await pool(query, [user_id, image_id, content, id]);
}

exports.deleteById = async (id) => {
    const query = `DELETE FROM feed WHERE id = ?`;
    return await pool(query, [id]);
}