CREATE TABLE gt_test.chatting
(
    `chatting_id`       INT            NOT NULL    AUTO_INCREMENT COMMENT '채팅 아이디', 
    `user_name_fk`      VARCHAR(45)    NOT NULL    COMMENT '채팅 유저 아이디', 
    `chatting_content`  TEXT           NOT NULL    COMMENT '채팅 내용', 
    `chatting_status`   VARCHAR(45)    NOT NULL    COMMENT '채팅 상태', 
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
     PRIMARY KEY (chatting_id)
);

ALTER TABLE gt_test.chatting COMMENT '채팅 테이블';

ALTER TABLE gt_test.chatting
    ADD CONSTRAINT FK_chatting_user_name_fk_user_user_name FOREIGN KEY (user_name_fk)
        REFERENCES user (user_name) ON DELETE RESTRICT ON UPDATE RESTRICT;