import * as express from 'express';
import UserRepository from './user.dao';
import { pool } from '../config/db';
// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
exports.Save_user = async function (id, password, email, user_name) {
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        let msg = '저장 성공'
        // console.log(pool)
        const board_info = [id, user_name, password, email]
        const response = await UserRepository.insertPost(conn, board_info);
        return { response, msg }
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
