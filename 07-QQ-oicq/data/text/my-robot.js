const axios = require("axios");

async function receiveVirtual(text) {
  let res = await axios.post(
    "https://ux-plus.xiaoice.com/s_api/game/getresponse?workflow=XCompanionBFChat",
    { TraceId: "22e8ffbeb3bfb90379957d50e26a3a35", Content: { Text: text, Metadata: {} } },
    {
      headers: {
        accept: " */*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/json;charset=UTF-8",
        cookie: "uxplusaffinity=1617080468.259.492.974876; cpid=9f7851bcf6af6e8f7e1738f7dd51915c; pname=; salt=218A72A30FE2658B1AE0B54A78781E81; .AspNetCore.Session=CfDJ8GtCTwQfNm1Avr1%2FUsIX5XM4DAjQFsuLJSa06ePKmf7gDOlVWPY4LoxuTHNeQpPUg4KZXnSbXdOuXVMlgIz1%2F61KGxNQLtQIk%2FdBpk%2B%2Fm0GtD2edDb8bvVmhlCfuv65jK0rPpsxi%2B%2FVrj1ZMLPA%2F48sALNf0%2B4E6vIY6kqKBvMN3; afuidcode=RbqHwe-h_6fsOKxoQgn1Y16YQ1_TWH2ei72PkLoL9SZY2ETekt08mYm4zFN7KitV7u7sde6nbAzrvYr-Ig5_gVA; logInfo=%7B%22pageName%22%3A%22customizedportrait%22%2C%22tid%22%3A%2222e8ffbeb3bfb90379957d50e26a3a35%22%7D; subpid=VirtualBF; apieid=e1ef32b6aa954c9d92675b9b7d9b739c",
        origin: "https://ux-plus.xiaoice.com",
        referer: "https://ux-plus.xiaoice.com/virtualboyfriend",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": " Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/89.0.4389.90",
      },
    }
  );
  return res.data[0].Content.Text;
}

module.exports = receiveVirtual;
