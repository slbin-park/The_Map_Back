const SAVE_COMMUNITY = `
INSERT
INTO community( home_name ,lati , longi , tag, price ,site , reason , user_id_fk, status , category) 
VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?);
`

const GET_COMMUNITY = `
SELECT *
FROM community;
`

const GET_COMMUNITY_ID = `
SELECT *
FROM community
WHERE id = ?
`

export {
    SAVE_COMMUNITY,
    GET_COMMUNITY,
    GET_COMMUNITY_ID
}