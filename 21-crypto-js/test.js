const CryptoJS = require("crypto-js");

var keyHex = CryptoJS.enc.Utf8.parse("abc");
let str = CryptoJS.DES.encrypt("12345", keyHex, {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
  iv: CryptoJS.enc.Utf8.parse("698"),
  format:CryptoJS.format.Hex
});

console.log(str.toString());
