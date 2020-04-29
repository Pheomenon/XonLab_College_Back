import request from '@/utils/request'
import chapter from './chapter'

export default {
    addVideo(video) {
        return request({
            url: `/eduservice/video/addVideo`,
            method: 'post',
            data: video
        })
    },
    deleteVideo(id){
        return request({
            url: `/eduservice/video/${id}`,
            method: 'delete'
        })
    },
    updateVideo(video){
        return request({
            url: `/eduservice/video`,
            method: 'post',
            data: video
        })
    },
    deleteAliVod(id){
        return request({
            url: `/eduvod/video/removeVideo/${id}`,
            method: 'delete',
        })
    },
}