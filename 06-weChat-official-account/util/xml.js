const { parseString } = require("xml2js");
module.exports = {
  getUserDataAsync(req) {
    return new Promise((resolve, reject) => {
      let xmlData = "";
      req
        .on("data", (data) => {
          //
          console.log(data);
          xmlData += data.toString();
        })
        .on("end", () => {
          //当数据接收完毕，会触发当前函数
          resolve(xmlData);
        });
    });
  },
  parseXMLAsync(xmlData) {
    return new Promise((resolve, reject) => {
      parseString(xmlData, { trim: true }, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject("parseXMLtoJS" + err);
        }
      });
    });
  },
  formatMessage(jsData) {
    let message = {};
    //获取xml对象
    jsData = jsData.xml;
    //判断是否是一个对象
    if (typeof jsData === "object") {
      //遍历对象
      for (let key in jsData) {
        let value = jsData[key];
        if (Array.isArray(value) && value.length > 0) {
          message[key] = value[0];
        }
      }
    }
    return message;
  },
};
