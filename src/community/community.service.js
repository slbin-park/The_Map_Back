import * as express from 'express';
import CommunityRepository from './community.dao'
import pool from '../config/db';
import response from '../config/response'
import baseResponse from '../config/baseReponse'

exports.Save_community = async function (home_name, lati, longi, tag, price, site, reason, user_id, category, images) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const status = 'ACTIVE'
        const community_info = [home_name, lati, longi, tag, price, site, reason, user_id, status, category]
        const res = await CommunityRepository.insertPost(conn, community_info);
        for (image_url of images) {
            const insertPostImgParams = [res.insertId, images];
            const postImgResult = await postDao.insertPostImg(connection, insertPostImgParams);
        }
        return response(baseResponse.SUCCESS)
    } catch (err) {
        console.log(err)
        return err
    } finally {
        conn.release();
    }
}

exports.Get_community = async function () {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const response = await CommunityRepository.selectUser(conn);
        return { response: response[0], msg }
    } catch (err) {
        console.log(err)
        return err
    } finally {
        conn.release();
    }
}

exports.Get_community_id = async function (id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        let msg = '조회 성공'
        // console.log(pool)
        const response = await CommunityRepository.selectCommunityId(conn, id);
        if (response[0].length) {
            return { response: response[0], msg }
        }
        else {
            return { msg: '없는 게시글입니다.' }
        }
    } catch (err) {
        console.log(err)
        return err
    } finally {
        conn.release();
    }
}
