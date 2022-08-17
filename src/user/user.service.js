import * as express from 'express';
import UserRepository from './user.dao';
import pool from '../config/db';
import * as jwt from '../middlewares/jwt'
import { response, errResponse } from "../config/response"
const bcrypt = require('bcrypt');
const saltRounds = 10;
import baseResponse from '../config/baseReponse'
// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
exports.Save_user = async function (user_id, password, email, user_name) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        // 비밀번호 암호화
        password = await bcrypt.hash(password, saltRounds);
        // DB에 넣을 데이터
        const board_info = [user_id, user_name, password, email]
        const user_res = await UserRepository.insertPost(conn, board_info);

        // 토큰 생성
        const access_token = await jwt.create_access_token(response.insertId)
        const refresh_token = await jwt.create_refresh_token();
        await jwt.save_refresh_token(response.insertId, refresh_token)
        return response(baseResponse.SUCCESS, { access_token, refresh_token })
    } catch (err) {
        logger.error(`App - Save_user UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

exports.Get_user = async function () {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        let msg = '저장 성공'
        // console.log(pool)
        const response = await UserRepository.selectUser(conn);
        return { response: response[0] }
    } catch (err) {
        logger.error(`App - Get_user UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

exports.Get_user_id = async function (id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        let msg = '저장 성공'
        // console.log(pool)
        const response = await UserRepository.selectUserId(conn, id);
        return { response: response[0] }
    } catch (err) {
        logger.error(`App - Get_user_id UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}


exports.Post_login = async function (user_id, password) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const user_data = await UserRepository.selectUserId(conn, user_id);
        const check = await bcrypt.compare(password, user_data[0].password);
        if (check) {
            const access_token = await jwt.create_access_token(user_data[0].user_idx)
            const refresh_token = await jwt.create_refresh_token();
            await jwt.save_refresh_token(user_data[0].user_idx, refresh_token)
            return response(baseResponse.SUCCESS, { access_token, refresh_token })
        }
        else {
            return ('로그인 실패')
        }
    } catch (err) {
        logger.error(`App - Post_login JWT error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

exports.Get_access_token = async function (refresh_token) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const user_data = await jwt.check_refresh_token(refresh_token)
        if (user_data.success) {
            const access_token = await jwt.create_access_token(user_data.user_data[0].user_idx)
            return response(baseResponse.SUCCESS, access_token)
        }
        else {
            return response(baseResponse.SIGN_USER_NOTHING)
        }
    } catch (err) {
        logger.error(`App - Get_access_token UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}