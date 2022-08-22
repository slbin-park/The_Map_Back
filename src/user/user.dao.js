import { SAVE_USER, GET_USER, GET_USER_ID } from './user.sql'


exports.insertPost = async (conn, boardInfo) => {
    const [save_user] = await conn.query(SAVE_USER,
        boardInfo
    );
    return save_user;
}

exports.selectUser = async (conn) => {
    const [get_user] = await conn.query(GET_USER);
    return get_user;
}
exports.selectUserId = async (conn, id) => {
    const [get_user_id] = await conn.query(GET_USER_ID, id);
    return get_user_id;
}
