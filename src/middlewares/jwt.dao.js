async function Update_Refresh_Token(conn, refresh_info) {
    const sql = `
    UPDATE user
    SET refresh_token = ?
    WHERE user_idx = ?
    `
    const [save_user] = await conn.query(sql,
        refresh_info
    );
    return save_user;
}
async function Get_Refresh_Token(conn, refresh_token) {
    const sql = `
    SELECT *
    FROM user
    WHERE refresh_token = ?
    `
    const [get_user_date_refresh_token] = await conn.query(sql, refresh_token)
    return get_user_date_refresh_token
}
export {
    Update_Refresh_Token,
    Get_Refresh_Token
}
