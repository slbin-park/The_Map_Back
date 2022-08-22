import { SAVE_COMMUNITY, GET_COMMUNITY, GET_COMMUNITY_ID, SAVE_COMMUNITY_IMG } from './community.sql'


const insertPost = async (conn, communityInfo) => {
    const save_user = await conn.query(SAVE_COMMUNITY,
        communityInfo
    );
    return save_user;
}

const insertPostImg = async (conn, img_info) => {
    const save_img = await conn.query(SAVE_COMMUNITY_IMG, img_info)
    return save_img;
}

const insertPostTag = async (conn, tag_info) => {
    const save_img = await conn.query(SAVE_COMMUNITY_IMG, tag_info)
    return save_img;
}

const selectCommunity = async (conn) => {
    const get_user = await conn.query(GET_COMMUNITY);
    return get_user;
}

const selectCommunityId = async (conn, id) => {
    const get_user_id = await conn.query(GET_COMMUNITY_ID, id);
    return get_user_id;
}

export {
    insertPost,
    insertPostImg,
    insertPostTag,
    selectCommunity,
    selectCommunityId
}