import { SAVE_USER, GET_USER, GET_USER_ID } from './user.sql'


async function insertPost(conn, boardInfo) {
    const save_user = await conn.query(SAVE_USER,
        boardInfo
    );
    return save_user;
}
async function selectUser(conn) {
    const get_user = await conn.query(GET_USER);
    return get_user;
}
async function selectUserId(conn, id) {
    const get_user_id = await conn.query(GET_USER_ID, id);
    return get_user_id;
}
module.exports = {
    insertPost,
    selectUser,
    selectUserId
}