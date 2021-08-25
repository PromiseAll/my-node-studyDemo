const CryptoJS = require("crypto-js");

// var keyHex = CryptoJS.enc.Utf8.parse("abc");
// let str = CryptoJS.DES.encrypt("12345", keyHex, {
//   mode: CryptoJS.mode.CBC,
//   padding: CryptoJS.pad.Pkcs7,
//   iv: CryptoJS.enc.Utf8.parse("698"),
//   format: CryptoJS.format.Hex,
// });

// console.log(str.toString());

let str = `中国天气网讯 预计7月30日至8月8日`;

// let strHex = CryptoJS.enc.Utf8.parse(str);
// console.log(CryptoJS.enc.Utf8.parse(str));
// console.log(CryptoJS.enc.Utf8.parse(str).toString(CryptoJS.enc.Hex));
console.log(CryptoJS.enc.Hex.parse('e4b8ade59bbde5a4a9e6b094e7bd91e8aeaf20e9a284e8aea137e69c883330e697a5e887b338e69c8838e697a5').toString(CryptoJS.enc.Base64));

console.log(CryptoJS.enc.Base64.parse('5Lit5Zu95aSp5rCU572R6K6vIOmihOiuoTfmnIgzMOaXpeiHszjmnIg45pel').toString(CryptoJS.enc.Utf8));

// var words = CryptoJS.enc.Base64.stringify(strHex);

// console.log(words);
// console.log(words.toString());
