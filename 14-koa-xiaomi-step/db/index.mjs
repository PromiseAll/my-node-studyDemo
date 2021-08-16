import mysql from "mysql2";
// 创建数据连接池
let pool;

export default {
  init() {
    pool = mysql.createPool({
      host: "42.193.7.139", // 数据库地址
      user: "data1", // 数据库用户
      password: "146116", // 数据库密码
      database: "data1", // 选中数据库
    });
  },
  query(sql, values) {
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
