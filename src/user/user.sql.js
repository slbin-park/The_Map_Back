const SAVE_USER = `
INSERT
INTO user(user_id , user_name , password , email  ) 
VALUES(? , ? , ? ,?);
`

const GET_USER = `
SELECT *
FROM user;
`

const GET_USER_ID = `
SELECT *
FROM user
WHERE user_id = ?
`

export {
    SAVE_USER,
    GET_USER,
    GET_USER_ID
}