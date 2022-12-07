import http from "./httpService";
import useSWR from "swr";

export const getUserEnrolmentsData = async (theUser) => {

    try {

        // const { data, error } = useSWR('/api/userEnrollments-detail/14/', async (url) => await http.get(url).then(r => r.data));
        var data = await http.get('/api/userEnrollments-detail/14/');

        return data

    } catch (error) {
        return null;
    }
};
export const getTheUserEnrolmentsData = async (url)=> {
    var data =  await http.get(url);
    return data.data;
}

export const getTheUserNotifications =  (theUser) => {
    try {
        const { data, error } = useSWR('/api/userNotifications-list/', async (url) => await http.get(url).then(r => r.data));
        // var data = await http.get('/api/userNotifications-list/');
        console.log(data);
        return {
            data: data,
            isLoading: !error && !data,
            isError: error
        }
    } catch (error) {
        return null;
    }
};
