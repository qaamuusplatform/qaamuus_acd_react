import http from "./httpService";

const endPoint = "jwt-login/";

export const login = async (data) => {
  // const response = await http.post(endPoint, {
  //   username: data.username,
  //   password: data.password,
  // },{ withCredentials: true });
  const response =  await fetch('https://qaamuus.academy/api/jwt-login/',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(
    {
      "username":"252615129181",
      "password":"8085"
    }
  )})

  console.log(response.body)
  if (response.data) {
    console.log(response.data)
    // localStorage.setItem("jwtToken", response.data.jwt);
  }else{
    console.log('failed')
  }
};
