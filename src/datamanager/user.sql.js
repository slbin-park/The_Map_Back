const save =
    `INSERT
     INTO user(user_name , phone_number , name , password , birthday , register , user_status ,accept_date ,refresh_token) 
     VALUES('?' , '?' , '?' , '?' , '?' , '?' , '?' , ? , '?' )
     `