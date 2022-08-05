import * as express from 'express';
import UserRepository from './user.dao';
import { pool } from '../config/db';
import * as jwt from '../middlewares/jwt'
const bcrypt = require('bcrypt');
const saltRounds = 10;
// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
exports.Save_user = async function (user_id, password, email, user_name) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        let msg = '저장 성공'
        // console.log(pool)
        password = await bcrypt.hash(password, saltRounds);
        console.log(password)
        const board_info = [user_id, user_name, password, email]
        const response = await UserRepository.insertPost(conn, board_info);
        const access_token = await jwt.create_access_token(response.insertId)
        const refresh_token = await jwt.create_refresh_token();
        await jwt.save_refresh_token(response.insertId, refresh_token)
        return { response, msg, access_token, refresh_token }
    } catch (err) {
        console.log(err)
        return err
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
        console.log(err)
        return err
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
        console.log(err)
        return err
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
            return { access_token, refresh_token, msg: '로그인성공' }
        }
        else {
            return ('로그인 실패')
        }
    } catch (err) {
        console.log(err)
        return err
    } finally {
        conn.release();
    }
}