import * as express from 'express';
import CommunityRepository from './community.dao'
import pool from '../config/db';
import { response, errResponse } from '../config/response'
import baseResponse from '../config/baseResponse'
import logger from '../config/winston';
exports.Save_community = async function (home_name, lati, longi, tag, price, site, reason, user_idx_fk, category, images) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const status = 'ACTIVE'
        const community_info = [home_name, lati, longi, tag, price, site, reason, user_idx_fk, status, category]
        const res = await CommunityRepository.insertPost(conn, community_info);
        for (image_url of images) {
            const insertPostImgParams = [res.insertId, images];
            const postImgResult = await postDao.insertPostImg(connection, insertPostImgParams);
        }
        return response(baseResponse.SUCCESS)
    } catch (err) {
        logger.error(`App - Save_community CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

exports.Get_community = async function () {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const res = await CommunityRepository.selectUser(conn);

        return { response: response[0], msg }
    } catch (err) {
        logger.error(`App - Get_community CommunityService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

exports.Get_community_id = async function (id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        let msg = '조회 성공'
        // console.log(pool)
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
