-- auto-generated definition

create schema gt_test collate utf8mb4_0900_ai_ci;


CREATE TABLE gt_test.user
(
    `user_name`      VARCHAR(45)    NOT NULL    COMMENT '사용자 이름',
    `phone_number`   VARCHAR(20)    NOT NULL    COMMENT '휴대폰번호',
    `name`           VARCHAR(20)    NOT NULL    COMMENT '이름',
    `password`       VARCHAR(21)    NOT NULL    COMMENT '비밀번호',
    `birthday`       DATE           NOT NULL    COMMENT '생일',
    `register`       VARCHAR(20)    NOT NULL    COMMENT '로그인구분',
    `user_status`    VARCHAR(20)    NOT NULL    COMMENT '유저 상태',
    `accept_date`    DATE           NULL        COMMENT '약관 동의 날짜',
    `refresh_token`  TEXT           NULL        COMMENT '토큰 저장',
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
     PRIMARY KEY (user_name)
);

ALTER TABLE user COMMENT '유저 도메인';