import * as express from 'express';
import * as CommunityRepository from './community.dao'
import pool from '../config/db';
import { response, errResponse } from '../config/response'
import baseResponse from '../config/baseResponse'
import logger from '../config/winston';

/**
 * 숙소 저장
 * @param {*} home_name 
 * @param {*} lati 
 * @param {*} longi 
 * @param {*} tags 
 * @param {*} price 
 * @param {*} site 
 * @param {*} reason 
 * @param {*} user_id 
 * @param {*} category 
 * @param {*} images 
 * @param {*} location 
 * @returns 
 */
const Save_community = async function (home_name, lati, longi, tags, price, site, reason, user_id, category, images, location) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        await conn.beginTransaction()
        const status = 'ACTIVE'
        const community_info = [home_name, lati, longi, price, site, reason, user_id, status, location, category]
        const community_check_info = [lati, longi, user_id]
        const community_check = await CommunityRepository.checkCommunity(conn, community_check_info);
        if (community_check.length) {
            return response(baseResponse.ALREADY_SAVE_COMMUNITY);
        }
        const res = await CommunityRepository.insertPost(conn, community_info);
        for (let image_url of images) {
            const insertPostImgParams = [res.insertId, image_url];
            await CommunityRepository.insertPostImg(conn, insertPostImgParams);
        }
        for (let community_tag of tags) {
            const insertPostTag = [res.insertId, community_tag]
            await CommunityRepository.insertPostTag(conn, insertPostTag)
        }
        await conn.commit();
        return response(baseResponse.SUCCESS)
    } catch (err) {
        await conn.rollback();
        logger.error(`App - Save_community CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

const Get_community = async function (last_community_id, user_id = 36) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const commu_info = [user_id, user_id, user_id, last_community_id]
        const res = await CommunityRepository.getCommunityAll(conn, commu_info);
        const count = await CommunityRepository.getCommunityCount(conn);
        for (let commu_id of res) {
            const img = await CommunityRepository.getCommunityImage(conn, commu_id.id);
            const tag = await CommunityRepository.getCommunityTag(conn, commu_id.id);
            commu_id.imgs = img;
            commu_id.tags = tag
        }
        await conn.commit();
        return response(baseResponse.SUCCESS, { count: count[0].count, community: res })
    } catch (err) {
        logger.error(`App - Get_community CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

const Get_community_id = async function (id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const res = await CommunityRepository.selectCommunityId(conn, id);
        if (rse[0].length) {
            return response(baseResponse.SUCCESS, res)
        }
        else {
            return { msg: '없는 게시글입니다.' }
        }
    } catch (err) {
        logger.error(`App - Get_community_id CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

/**
 * 
 * @param {*} start_lati 북동 위도 (오른쪽위)
 * @param {*} end_lati 남서 위도 (왼쪽밑)
 * @param {*} start_longi 북동 경도 (오른쪽위) 경도는 오른쪽이 더 작음
 * @param {*} end_longi 남서 경도 (왼쪽밑)
 * @param {*} user_id 
 * @returns 
 */
const Get_main = async function (start_lati, end_lati, start_longi, end_longi, user_id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const main_info = [user_id, user_id, end_lati, start_lati, end_longi, start_longi]
        const res = await CommunityRepository.getCommunityMain(conn, main_info);
        for (let commu_id of res) {
            const img = await CommunityRepository.getCommunityImage(conn, commu_id.id);
            const tag = await CommunityRepository.getCommunityTag(conn, commu_id.id);
            commu_id.imgs = img;
            commu_id.tags = tag
        }
        return response(baseResponse.SUCCESS, res)
    } catch (err) {
        logger.error(`App - Get_main CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

/**
 * 커뮤니티 좋아요 저장
 */

const Save_community_like = async function (user_id, community_id) {
    const status = 'ACTIVE'
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const like_info = [community_id, user_id, status]
        const check_like_info = [user_id, community_id]
        const check = await CommunityRepository.getCommunityLike(conn, check_like_info);
        if (check.length) {
            return response(baseResponse.ALREADY_LIKE_COMMUNITY);
        }
        await CommunityRepository.inserCommunityLike(conn, like_info);
        await conn.commit();
        return response(baseResponse.SUCCESS)
    } catch (err) {
        logger.error(`App - Save_community_like CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

export {
    Save_community,
    Get_community,
    Get_community_id,
    Get_main,
    Save_community_like
}