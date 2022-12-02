import http from "./httpService";
import useSWR from "swr";

export const getUserEnrolmentsData = async (theUser) => {
    
    try {

        // const { data, error } = useSWR('/api/userEnrollments-detail/14/', async (url) => await http.get(url).then(r => r.data));
        var data = await http.get('/api/userEnrollments-detail/14/');
        
        return data
        // return jwtDecode(jwtToken);
    } catch (error) {
        return null;
    }
};
