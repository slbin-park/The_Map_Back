import * as express from 'express';
import * as UserService from './user.service'


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
            const { user_name, email } = req.params
            const response = await UserService.Get_user_id(user_name, email)
            res.send(response);
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
    },

    get_access_token: async (req, res) => {
        try {
            let refresh_token = req.headers.authorization
            if (!refresh_token) {
                res.send('리프레시 토큰이 없음 실패')
            }
            else {
                refresh_token = refresh_token.split(' ')[1]
                const response = await UserService.Get_access_token(refresh_token)
                res.json(response);
            }
        } catch (err) {
            console.log(err)
        }
    },

    update_user_profile: async (req, res) => {
        try {
            const { user_name, profile_url, email, user_id } = req.body
            const response = await UserService.Update_user_profile(user_name, profile_url, email, user_id)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

}


export default UserController;