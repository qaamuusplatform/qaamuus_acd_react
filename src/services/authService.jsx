import http from "./httpService";

const endPoint = "/api/jwt-login/";
import useSWR from "swr";
const token = "jwt";
import axios from "axios";
export const login = async (username, password) => {
  const { data } = await http.post(endPoint, { username, password });
  console.log(data)

};

export const getLoggedInUser =() => {
  try {

    // const { data, error } = useSWR('/api/userProfile-detail/14/', async (url) => await axios(url).then(r => r.data));
    // // var userInfo= await  http.get('/api/userProfile-detail/14/');
    // console.log(data);
    const data = {"id":14,"number":"616222111","profileImage":"/media/images/usrProfile/favicon_1.png","password":"12345","email":"mmm@gmail.com","userTitle":"Web  Dev And network","fullName":"Maxamed Jayte","aboutMe":"desc","stayedSeconds":0,"facebook_link":null,"twitter_link":null,"third_link":null,"learnedSeconds":0,"status":true,"contactMe":null,"referralCode":"qReff_9002","teacherPoints":1.0,"user_activated":false,"user":{"id":17,"password":"pbkdf2_sha256$390000$8JPjB6uUMsV4Ul3OqoDSBm$csIRstNfk9yH0YzbQ5/feUX9R+koLmLsEq7AYi3sJgQ=","last_login":"2022-09-14T11:20:14.628001+03:00","is_superuser":false,"username":"616222111","first_name":"Maxamed","last_name":"Jayte","email":"mmm@gmail.com","is_staff":false,"is_active":true,"date_joined":"2022-09-14T11:20:00.905283+03:00","groups":[],"user_permissions":[]},"userType":{"id":1,"name":"Normal User"}};
    return data
    // return jwtDecode(jwtToken);
  } catch (error) {
    return null;
  }
};
