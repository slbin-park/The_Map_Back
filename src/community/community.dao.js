const insertPost = async (conn, communityInfo) => {
    const sql = `INSERT
    INTO community( home_name ,lati , longi , price ,site , reason , user_idx_fk, status , location , category) 
    VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? ,? );`

    const [save_user] = await conn.query(sql,
        communityInfo
    );
    return save_user;
}

const insertPostImg = async (conn, img_info) => {
    const sql = `
        INSERT INTO
        community_image(commu_id_fk, address)
        VALUES ( ? , ? )
        `
    const [save_img] = await conn.query(sql, img_info)
    return save_img;
}

const insertPostTag = async (conn, tag_info) => {
    const sql = `
        INSERT INTO
        community_tag(commu_id_fk,tag_name)
        VALUES ( ? , ? )
        `
    const [save_img] = await conn.query(sql, tag_info)
    return save_img;
}

/**
 * 이미 등록한 숙소인지 확인
 */
const checkCommunity = async (conn, communityInfo) => {
    const sql = `
    SELECT *
    FROM community
    WHERE lati = ?
    AND longi = ? 
    AND user_idx_fk = ?
    `

    const [save_user] = await conn.query(sql,
        communityInfo
    );
    return save_user;
}

const insertPostCate = async (conn, cate_info) => {
    const sql = `
        INSERT INTO
        community_category(commu_id_fk , category_name)
        VALUES ( ? , ? )
        `
    const [save_img] = await conn.query(sql, cate_info)
    return save_img;
}


const selectCommunity = async (conn) => {
    const sql = `
        SELECT *
        FROM community;
        `
    const [get_user] = await conn.query(sql);
    return get_user;
}

const selectCommunityId = async (conn, id) => {
    const sql = `
        SELECT *
        FROM community
        WHERE id = ?
        `
    const [get_user_id] = await conn.query(sql, id);
    return get_user_id;
}

const getCommunityMain = async (conn, main_info) => {
    const sql = `
    SELECT *
    FROM (
        SELECT *
        FROM community
        WHERE user_idx_fk = ?
        OR id  IN (
            SELECT commu_id_fk
            from community_like
            WHERE user_idx_fk = ?
            )
         ) as cm
    WHERE (cm.lati >= ?
        AND cm.lati <= ?
        AND cm.longi >= ?
        AND cm.longi <= ?
        )    
    `
    const [get_community_main] = await conn.query(sql, main_info);
    return get_community_main;
}

const getCommunityImage = async (conn, commu_id) => {
    const sql = `
        SELECT *
        FROM community_image
        WHERE commu_id_fk = ?
    `
    const [get_img] = await conn.query(sql, commu_id);
    return get_img;
}


const getCommunityTag = async (conn, commu_id) => {
    const sql = `
        SELECT *
        FROM community_tag
        WHERE commu_id_fk = ?
    `
    const [get_tag] = await conn.query(sql, commu_id);
    return get_tag;
}

/**
 * 팔로우상태로직도 넣어보기
 */
const getCommunityAll = async (conn, last_community_id) => {
    const sql = `
    SELECT cm.* , us.user_name , us.profile_Url,
    case
        when (SELECT follow_status
            FROM follow
            WHERE follower_id_fk = ?
            AND following_id_fk = cm.user_idx_fk
            ) = 'ACTIVE'
            OR cm.user_idx_fk = ?
            then 'FOLLOW'
        else 'UNFOLLOW'
        end as follow
    FROM community cm
    LEFT JOIN user us
    ON cm.user_idx_fk = us.user_idx
    WHERE cm.id < ?
    ORDER BY id DESC
    LIMIT 10;
    `
    const [get_community] = await conn.query(sql, last_community_id);
    return get_community;
}

const getCommunityCount = async (conn) => {
    const sql = `
    SELECT COUNT(*) as count 
    FROM community
    `
    const [count] = await conn.query(sql);
    return count;
}

/**
 * 커뮤니티 좋아요 저장
 */
const inserCommunityLike = async (conn, like_info) => {
    const status = '`status`'
    const sql = `
    INSERT
    INTO community_like(commu_id_fk, user_idx_fk, ${status})
    VALUES ( ? , ? , ? );
    `
    const [like] = await conn.query(sql, like_info);
    return like;
}

const getCommunityLike = async (conn, like_info) => {
    const sql = `
    SELECT *
    FROM community_like
    WHERE user_idx_fk= ?
    AND commu_id_fk = ?;
    `
    const [like] = await conn.query(sql, like_info);
    return like;
}
export {
    insertPost,
    insertPostImg,
    insertPostTag,
    selectCommunity,
    selectCommunityId,
    insertPostCate,
    getCommunityMain,
    getCommunityImage,
    getCommunityTag,
    getCommunityAll,
    getCommunityCount,
    inserCommunityLike,
    getCommunityLike,
    checkCommunity
}