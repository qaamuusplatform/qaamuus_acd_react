import http from "./httpService";



export const getAllCourses = ()=> {
    return http.get('api/qaCourse-list/');
}
export const getCoursesDetail = (id)=> {
    return http.get(`api/qaCourse-detail/${id}`);
}