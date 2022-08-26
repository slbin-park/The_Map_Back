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

    /**
     * 유저 패스워드 변경하기전 유효한지 체크
     */
    check_user_password: async (req, res) => {
        try {
            const { user_id, user_name } = req.params
            const response = await UserService.Check_user(user_id, user_name)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * 유저 패스워드 변경
     */
    update_user_password: async (req, res) => {
        try {
            const { user_id, password } = req.body
            const response = await UserService.Update_user_password(user_id, password)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * 팔로우 하기
     */
    save_follow: async (req, res) => {
        try {
            const { user_id } = req.body
            const { following_user_id } = req.params
            const response = await UserService.Save_follow(user_id, following_user_id)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * 팔로워 팔로잉 정보 가져오기
     */
    get_follow: async (req, res) => {
        try {
            const { user_id } = req.params
            const response = await UserService.Get_Follow(user_id)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },
}


export default UserController;