import http from "./httpService";



export const getAllCourses = async (url)=> {
    var data =  await http.get(url);
    return data.data;
}
export const getCoursesDetail = async (url)=> {
    var data =  await http.get(url);
    return data.data;
}

export const httpFetcher = async (url)=> {
    var data =  await http.get(url);
    return data.data;
}



export const processPaymentService =async (body)=>{
    var data =  await http.post(`/api/inrollCourseToUser/${body.type}/`,body);
    return data.data;
}