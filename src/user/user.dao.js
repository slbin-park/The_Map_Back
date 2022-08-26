import { SAVE_USER, GET_USER, GET_USER_ID } from './user.sql'


const insertPost = async (conn, boardInfo) => {
    const [save_user] = await conn.query(SAVE_USER,
        boardInfo
    );
    return save_user;
}

const selectUser = async (conn) => {
    const [get_user] = await conn.query(GET_USER);
    return get_user;
}
const selectUserId = async (conn, id) => {
    const [get_user_id] = await conn.query(GET_USER_ID, id);
    return get_user_id;
}

const updateUserProfile = async (conn, profile_info) => {
    const sql = `
    UPDATE user
    SET user_name = ? , profile_Url = ? , email = ?
    WHERE user_idx = ?;
    `
    const [update_user_profile] = await conn.query(sql, profile_info);
    return update_user_profile;
}

const getUserId = async (conn, user_info) => {
    const sql = `
    SELECT user_id,create_at,profile_url
    FROM user
    WHERE user_name = ?
    AND email = ?;
    `
    const [user_id] = await conn.query(sql, user_info);
    return user_id;
}

const checkUser = async (conn, user_info) => {
    const sql = `
    SELECT *
    FROM user
    WHERE user_id = ?
    AND user_name = ?;
    `
    const [user] = await conn.query(sql, user_info);
    return user;
}

/**
 * 유저 비밀번호 변경
 */
const updateUserPassword = async (conn, user_info) => {
    const sql = `
    UPDATE user
    SET password = ?
    WHERE user_idx = ?
    `
    const [user] = await conn.query(sql, user_info);
    return user;
}


/**
 * 팔로우 체크
 */
const checkFollow = async (conn, follow_info) => {
    const sql = `
    SELECT *
    FROM follow
    WHERE follower_id_fk = ? 
    AND following_id_fk = ?
    `
    const [res] = await conn.query(sql, follow_info)
    return res
}


/**
 * 팔로우 저장
 */
const insertFollow = async (conn, follow_info) => {
    const sql = `
    INSERT
    INTO follow(follower_id_fk, following_id_fk, follow_status)
    VALUES(? , ? , ?)
    `
    const [res_f] = await conn.query(sql, follow_info);
    return res_f
}

/**
 * 팔로잉 불러오기
 */
const getFollowing = async (conn, follow_info) => {
    const sql = `
    SELECT us.profile_Url , us.user_idx , us.user_name
    FROM follow fw
    LEFT JOIN user us
    ON fw.following_id_fk = us.user_idx
    WHERE follower_id_fk = ?
    `
    const [res] = await conn.query(sql, follow_info)
    return res
}

/**
 * 팔로워 불러오기
 */
const getFollower = async (conn, follow_info) => {
    const sql = `
    SELECT us.profile_Url , us.user_idx , us.user_name
    FROM follow fw
    LEFT JOIN user us
    ON fw.follower_id_fk = us.user_idx
    WHERE following_id_fk = ?`
    const [res] = await conn.query(sql, follow_info)
    return res
}

export {
    insertPost,
    selectUser,
    selectUserId,
    updateUserProfile,
    getUserId,
    checkUser,
    updateUserPassword,
    checkFollow,
    insertFollow,
    getFollowing,
    getFollower
}