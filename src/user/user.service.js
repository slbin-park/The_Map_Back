import * as express from 'express';
import * as UserRepository from './user.dao';
import pool from '../config/db';
import * as jwt from '../middlewares/jwt'
import { response, errResponse } from "../config/response"
const bcrypt = require('bcrypt');
const saltRounds = 10;
import baseResponse from '../config/baseResponse'
import logger from '../config/winston';


// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
const Save_user = async function (user_id, password, email, user_name) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const check_user = await UserRepository.selectUserId(conn, user_id);
        if (check_user.length) {
            return response(baseResponse.SIGNUP_REDUNDANT_USER_NAME);
        }
        // 비밀번호 암호화
        password = await bcrypt.hash(password, saltRounds);
        // DB에 넣을 데이터
        const board_info = [user_id, user_name, password, email]
        const user_res = await UserRepository.insertPost(conn, board_info);
        const user_idx = user_res.insertId
        // 토큰 생성
        const access_token = await jwt.create_access_token(user_res.insertId)
        const refresh_token = await jwt.create_refresh_token();
        conn.commit();
        await jwt.save_refresh_token(user_res.insertId, refresh_token)
        return response(baseResponse.SUCCESS, { access_token, refresh_token, user_idx, user_name })
    } catch (err) {
        logger.error(`App - Save_user UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

const Get_user_id = async function (user_name, email) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const user_info = [user_name, email]
        const res = await UserRepository.getUserId(conn, user_info)
        conn.commit();
        return response(baseResponse.SUCCESS, res)
    } catch (err) {
        logger.error(`App - Get_user UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}



const Post_login = async function (user_id, password) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const user_data = await UserRepository.selectUserId(conn, user_id);
        const check = await bcrypt.compare(password, user_data[0].password);
        if (check) {
            const access_token = await jwt.create_access_token(user_data[0].user_idx)
            const refresh_token = await jwt.create_refresh_token();
            await jwt.save_refresh_token(user_data[0].user_idx, refresh_token)
            const user_idx = user_data[0].user_idx
            const user_name = user_data[0].user_name
            conn.commit();
            return response(baseResponse.SUCCESS, { access_token, refresh_token, user_idx, user_name })
        }
        else {
            return response(baseResponse.LOGIN_FAIL)
        }
    } catch (err) {
        logger.error(`App - Post_login UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

const Get_access_token = async function (refresh_token) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        console.log('실행')
        const user_data = await jwt.check_refresh_token(refresh_token)
        if (user_data.success) {
            const user_idx = user_data.user_data[0].user_idx
            const user_name = user_data.user_data[0].user_name
            const access_token = await jwt.create_access_token(user_data.user_data[0].user_idx)
            conn.commit();
            return response(baseResponse.SUCCESS, { user_idx, user_name, access_token })
        }
        else {
            return response(baseResponse.TOKEN_VERIFICATION_FAILURE)
        }
    } catch (err) {
        logger.error(`App - Get_access_token UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

const Update_user_profile = async function (user_name, profile_url, email, user_id) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const update_info = [user_name, profile_url, email, user_id]
        await UserRepository.updateUserProfile(conn, update_info);
        await conn.commit();
        return response(baseResponse.SUCCESS)
    } catch (err) {
        logger.error(`App - Update_user_profile UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

/**
 * 비밀번호 변경하기 유저 체크
 */
const Check_user = async function (user_id, user_name) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        const user_info = [user_id, user_name]
        const check = await UserRepository.checkUser(conn, user_info);
        if (check.length) {
            const user_idx = check[0].user_idx
            const token = await jwt.create_access_token(user_idx)
            return response(baseResponse.SUCCESS, { token })
        }
        else {
            return response(baseResponse.SIGN_USER_NOTHING)
        }
    } catch (err) {
        logger.error(`App - Update_user_profile UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}

/**
 * 유저 비밀번호 변경
 */
const Update_user_password = async function (user_id, password) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        password = await bcrypt.hash(password, saltRounds);
        const user_info = [password, user_id]
        const ck = await UserRepository.updateUserPassword(conn, user_info);
        await conn.commit();
        return response(baseResponse.SUCCESS)
    } catch (err) {
        logger.error(`App - Update_user_profile UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        conn.release();
    }
}


export {
    Save_user,
    Post_login,
    Get_access_token,
    Update_user_profile,
    Get_user_id,
    Check_user,
    Update_user_password
}