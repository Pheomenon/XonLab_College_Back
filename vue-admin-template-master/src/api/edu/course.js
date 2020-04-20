import request from '@/utils/request'

export default {
    //添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    getListTeacher() {
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get',
        })
    },
    getCourseInfo(id) {
        return request({
            url: `/eduservice/course/getCourseInfo/${id}`,
            method: 'get',
        })
    },
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    }
}