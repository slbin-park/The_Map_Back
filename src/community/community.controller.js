import * as express from 'express';
import * as CommunityService from './community.service'
import * as JWT from '../middlewares/jwt'

const CommunityController = {

    // 숙소 저장
    post_community: async (req, res) => {
        try {
            const { home_name, lati, longi, tag, price, site, reason, location, user_id, category, images } = req.body
            const response = await CommunityService.Save_community(home_name, lati, longi, tag, price, site, reason, user_id, category, images, location)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    // 메인화면 진입시 숙소정보 불러오기
    get_main: async (req, res) => {
        try {
            let { start, end } = req.query
            start = start.split(',')
            end = end.split(',')
            const start_lati = start[0]//위도
            const start_longi = start[1]
            const end_lati = end[0]
            const end_longi = end[1]
            const { user_id } = req.params
            const response = await CommunityService.Get_main(start_lati, end_lati, start_longi, end_longi, user_id)
            res.send(response);
        } catch (err) {
            console.log(err)
        }
    },

    // 커뮤니티 불러오기
    get_community: async (req, res) => {
        try {
            const { last_community_id } = req.params
            const response = await CommunityService.Get_community(last_community_id)
            res.send(response);
        } catch (err) {
            console.log(err)
        }
    },


    // 수정예정
    get_community_id: async (req, res) => {
        try {
            const id = req.params.id
            const response = await CommunityService.Get_community_id(id)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * 커뮤니티 좋아요 저장
     */
    post_community_like: async (req, res) => {
        try {
            const { user_id } = req.body;
            const { community_id } = req.params
            const response = await CommunityService.Save_community_like(user_id, community_id);
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    }
}


export default CommunityController;