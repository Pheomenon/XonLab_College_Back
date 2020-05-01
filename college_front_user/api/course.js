import request from '@/utils/request'

export default{
    //分页查询课程
    getCourseList(page,limit,search){
        return request({
            url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
            method: 'post',
            data: search
        }) 
    },
    //查询所有分类
    getAllSubject(){
        return request({
            url: `/eduservice/subject/getAllSubject`,
            method: 'get',
        }) 
    },
    //课程详情
    getCourseInfo(courseId){
        return request({
            url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
            method: 'get',
        }) 
    }
}