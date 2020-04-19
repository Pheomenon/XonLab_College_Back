import request from '@/utils/request'

export default{
    //条件+分页查询
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            url: `/eduservice/teacher/teacherPageCondition/${current}/${limit}`,
            method: 'post',
            //data表示把对象转换成JSON进行传递到接口中
            data: teacherQuery
          })
    },
    deleteTeachById(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get'
        })
    },
    updateTeacherInfo(teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }
}