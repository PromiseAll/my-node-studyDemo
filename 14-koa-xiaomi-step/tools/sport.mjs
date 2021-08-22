import Axios from "axios";
import dayjs from "dayjs";
import { readFileSync } from "fs";

/**
 * @description: 获取AccessCode-用于登录
 * @param {*} phone 账号-手机号
 * @param {*} password 密码
 * @return {*} code
 */
async function getAccessCode(phone, password) {
  phone = `+86${phone}`;
  let url = `https://api-user.huami.com/registrations/${phone}/tokens`;
  let data = new URLSearchParams({
    phone_number: phone,
    password,
    state: "REDIRECTION",
    client_id: "HuaMi",
    country_code: "CN",
    token: "access",
    redirect_uri: "https://s3-us-west-2.amazonaws.com/hm-registration/successsignin.html",
  });
  let res = await Axios.post(url, data, {
    maxRedirects: 0, //禁止303 跳转
    validateStatus: (status) => {
      return (status >= 200 && status < 300) || status == 303;
    },
  });
  const {
    headers: { location },
  } = res;
  let code = new URL(location).searchParams.get("access");
  return code;
}

/**
 * @description: 登录获取用户信息
 * @param {*} code AccessCode码
 * @return {*} {userid,apptoken}
 */
async function login(code) {
  let url = `https://account.huami.com/v2/client/login`;
  let data = new URLSearchParams({
    app_name: "com.xiaomi.hm.health",
    country_code: "CN",
    code,
    device_id: "be49ae737faf717b",
    device_model: "android_phone",
    app_version: "5.3.0",
    grant_type: "access_token",
    allow_registration: "false",
    dn: "account.huami.com,api-user.huami.com,api-watch.huami.com,auth.huami.com,api-analytics.huami.com,app-analytics.huami.com,api-mifit.huami.com",
    third_name: "huami_phone",
    source: "com.xiaomi.hm.health:5.3.0:50464",
    lang: "zh",
  });
  let res = await Axios.post(url, data);
  return {
    userid: res.data.token_info.user_id,
    apptoken: res.data.token_info.app_token,
  };
}

/**
 * @description: 提交同步
 * @param {*} userid 用户id
 * @param {*} apptoken apptoken
 * @param {*} step 步数
 * @return {*} result
 */
async function submit(userid, apptoken, step) {
  let data = readFileSync(process.cwd() + "/tools/data.txt").toString();
  data = data.replace("my_userid", userid);
  data = data.replace("my_date", dayjs().format("YYYY-MM-DD"));
  data = data.replace("my_step", step);
  let res = await Axios.post("https://api-mifit.huami.com/v1/data/band_data.json", data, {
    headers: {
      apptoken,
    },
  });

  return res.data;
}

/**
 * @description: 开始提交
 * @param {Number} phone 账号
 * @param {*} password 密码
 * @param {*} step 步数
 * @return {*} result
 */
async function start(phone, password, step) {
  let result = null;
  try {
    let code = await getAccessCode(phone, password);
    const { userid, apptoken } = await login(code);
    result = await submit(userid, apptoken, step);

    return result;
  } catch (error) {
    return {
      code: 2,
      message: "error",
    };
  }
}

async function test() {
  console.log(await start(18270009337, "zgw18270009337", 2003));
}

export default start;
