CREATE TABLE reply_like
(
    `reply_like_id`  INT            NOT NULL    AUTO_INCREMENT COMMENT '댓글 좋아요 아이디', 
    `reply_id_fk`    INT            NOT NULL    COMMENT '댓글 아이디', 
    `reply_status`   VARCHAR(45)    NOT NULL    COMMENT '댓글 상태', 
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
    `user_name_fk`   VARCHAR(45)    NOT NULL    COMMENT '유저 아이디', 
     PRIMARY KEY (reply_like_id)
);

ALTER TABLE reply_like COMMENT '댓글 좋아요 테이블';

ALTER TABLE reply_like
    ADD CONSTRAINT FK_reply_like_reply_id_fk_board_reply_reply_id FOREIGN KEY (reply_id_fk)
        REFERENCES board_reply (reply_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE reply_like
    ADD CONSTRAINT FK_reply_like_user_name_fk_user_user_name FOREIGN KEY (user_name_fk)
        REFERENCES user (user_name) ON DELETE RESTRICT ON UPDATE RESTRICT;