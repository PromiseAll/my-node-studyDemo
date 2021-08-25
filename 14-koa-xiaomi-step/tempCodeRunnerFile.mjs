import axios from "axios";

let headersList = {
 "cookie": "JSESSIONID=C7F70E06C1447849F962C9D99A938F5F" 
}

let reqOptions = {
  url: "https://fxgl.jx.edu.cn/4136010406/studentQd/studentIsQds",
  method: "POST",
  headers: headersList,
}

axios.request(reqOptions).then(function (response) {
  console.log(response.data);
})