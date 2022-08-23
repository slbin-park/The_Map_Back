import * as express from 'express';
import * as CommunityRepository from './community.dao'
import pool from '../config/db';
import { response, errResponse } from '../config/response'
import baseResponse from '../config/baseResponse'
import logger from '../config/winston';

// 숙소 저장
const Save_community = async function (home_name, lati, longi, tags, price, site, reason, user_id, category, images, location) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        await conn.beginTransaction()
        const status = 'ACTIVE'
        const community_info = [home_name, lati, longi, price, site, reason, user_id, status, location, category]
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

const Get_community = async function (last_community_id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const res = await CommunityRepository.getCommunityAll(conn, last_community_id);
        const count = await CommunityRepository.getCommunityCount(conn);
        for (let commu_id of res) {
            const img = await CommunityRepository.getCommunityImage(conn, commu_id.id);
            const tag = await CommunityRepository.getCommunityTag(conn, commu_id.id);
            commu_id.imgs = img;
            commu_id.tags = tag
        }
        await conn.commit();
        console.log(count[0].count)
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
        logger.error(`App - Get_community CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

const Get_main = async function (start_lati, end_lati, start_longi, end_longi, user_id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const main_info = [user_id, user_id, start_lati, end_lati, start_longi, end_longi]
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

export {
    Save_community,
    Get_community,
    Get_community_id,
    Get_main
}