import * as express from 'express';
import * as CommunityService from './community.service'

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후 
// 서비스 레이어와 상호작용만 하도록
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

    get_community: async (req, res) => {
        try {
            const response = await CommunityService.Get_community()
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    },

    get_community_id: async (req, res) => {
        try {
            const id = req.params.id
            const response = await CommunityService.Get_community_id(id)
            res.json(response);
        } catch (err) {
            console.log(err)
        }
    }
}


export default CommunityController;