import { SAVE_COMMUNITY, GET_COMMUNITY, GET_COMMUNITY_ID } from './community.sql'


async function insertPost(conn, communityInfo) {
    const save_user = await conn.query(SAVE_COMMUNITY,
        communityInfo
    );
    return save_user;
}
async function selectCommunity(conn) {
    const get_user = await conn.query(GET_COMMUNITY);
    return get_user;
}
async function selectCommunityId(conn, id) {
    const get_user_id = await conn.query(GET_COMMUNITY_ID, id);
    return get_user_id;
}
module.exports = {
    insertPost,
    selectCommunity,
    selectCommunityId
}