-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- user Table Create SQL
CREATE TABLE user
(
    `id`             VARCHAR(45)     NOT NULL    COMMENT '유저 아이디', 
    `password`       VARCHAR(45)     NOT NULL    COMMENT '비밀번호', 
    `user_name`      VARCHAR(45)     NOT NULL    COMMENT '유저 이름', 
    `email`          VARCHAR(45)     NOT NULL    COMMENT '이메일', 
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
    `refresh_token`  VARCHAR(200)    NULL        COMMENT '리프레시토큰', 
     PRIMARY KEY (id)
);

ALTER TABLE user COMMENT '유저 테이블';


-- community Table Create SQL
CREATE TABLE community
(
    `id`          INT             NOT NULL    AUTO_INCREMENT COMMENT '커뮤니티 식별자', 
    `home_name`   VARCHAR(45)     NOT NULL    COMMENT '숙소 이름', 
    `lati`        VARCHAR(45)     NOT NULL    COMMENT '숙소 위도', 
    `price`       BIGINT          NOT NULL    COMMENT '숙소 가격', 
    `site`        VARCHAR(45)     NOT NULL    COMMENT '예약 사이트', 
    `reason`      VARCHAR(100)    NOT NULL    COMMENT '찜한 이유', 
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
    `status`      VARCHAR(45)     NOT NULL    COMMENT '숙소 상태', 
    `user_id_fk`  VARCHAR(45)     NOT NULL    COMMENT '작성자 아이디', 
    `longi`       VARCHAR(45)     NOT NULL    COMMENT '숙소 경도', 
    `category`    VARCHAR(45)     NOT NULL    COMMENT '숙소 카테고리', 
     PRIMARY KEY (id)
);

ALTER TABLE community COMMENT '커뮤니티';

ALTER TABLE community
    ADD CONSTRAINT FK_community_user_id_fk_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- community_tag Table Create SQL
CREATE TABLE community_tag
(
    `tag_id`       INT            NOT NULL    COMMENT '태그 아이디', 
    `commu_id_fk`  INT            NOT NULL    COMMENT '커뮤니티 아이디', 
    `tag_name`     VARCHAR(45)    NOT NULL    COMMENT '태그 이름', 
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
     PRIMARY KEY (tag_id)
);

ALTER TABLE community_tag COMMENT '커뮤니티 태그';

ALTER TABLE community_tag
    ADD CONSTRAINT FK_community_tag_commu_id_fk_community_id FOREIGN KEY (commu_id_fk)
        REFERENCES community (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- community_image Table Create SQL
CREATE TABLE community_image
(
    `image_id`     INT          NOT NULL    AUTO_INCREMENT COMMENT '이미지 식별자', 
    `commu_id_fk`  INT          NOT NULL    COMMENT '커뮤니티 식별자 fk', 
    `address`      TEXT         NULL        COMMENT '이미지 주소', 
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
     PRIMARY KEY (image_id)
);

ALTER TABLE community_image COMMENT '커뮤니티 이미지';

ALTER TABLE community_image
    ADD CONSTRAINT FK_community_image_commu_id_fk_community_id FOREIGN KEY (commu_id_fk)
        REFERENCES community (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- follow Table Create SQL
CREATE TABLE follow
(
    `id`               INT            NOT NULL    AUTO_INCREMENT COMMENT '팔로우 식별자', 
    `follower_id_fk`   VARCHAR(45)    NOT NULL    COMMENT '팔로워', 
    `following_id_fk`  VARCHAR(45)    NOT NULL    COMMENT '팔로잉', 
    `follow_status`    VARCHAR(45)    NOT NULL    COMMENT '팔로우 상태', 
    `create_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP      NOT NULL    COMMENT '만든 날짜',
    `update_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      NOT NULL    COMMENT '수정 날짜',
     PRIMARY KEY (id)
);

ALTER TABLE follow COMMENT '팔로우 테이블';

ALTER TABLE follow
    ADD CONSTRAINT FK_follow_follower_id_fk_user_id FOREIGN KEY (follower_id_fk)
        REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE follow
    ADD CONSTRAINT FK_follow_following_id_fk_user_id FOREIGN KEY (following_id_fk)
        REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


