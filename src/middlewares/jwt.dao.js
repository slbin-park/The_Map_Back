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
export {
    Update_Refresh_Token
}
