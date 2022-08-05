import * as express from 'express';
import UserService from './user.service'

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후 
// 서비스 레이어와 상호작용만 하도록
const UserController = {
    post_user: async (req, res) => {
        try {
            const { user_id, password, user_name, email } = req.body
            const response = await UserService.Save_user(user_id, password, email, user_name)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    get_user: async (req, res) => {
        try {
            const response = await UserService.Get_user()
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    get_user_id: async (req, res) => {
        try {
            const id = req.params.id
            const response = await UserService.Get_user_id(id)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    post_login: async (req, res) => {
        try {
            const { user_id, password } = req.body
            const response = await UserService.Post_login(user_id, password)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    }
}


export default UserController;