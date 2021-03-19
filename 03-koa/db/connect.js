const mysql = require("mysql");

// 创建数据连接池
const pool = mysql.createPool({
  host: "123.56.95.108", // 数据库地址
  user: "root", // 数据库用户
  password: "146116", // 数据库密码
  database: "myData", // 选中数据库
});

module.exports = {
  query: function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
            connection.release();
          });
        }
      });
    });
  },
};
