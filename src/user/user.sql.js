const SAVE_USER = `
INSERT
INTO user(id , user_name , password , email  ) 
VALUES(? , ? , ? ,?);
`

const GET_USER = `
SELECT *
FROM user;
`

const GET_USER_ID = `
SELECT *
FROM user
WHERE id = ?
`

export {
    SAVE_USER,
    GET_USER,
    GET_USER_ID
}