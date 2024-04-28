var mysql = require('mysql');
var DataBase = function () {
};

DataBase.get = function () {
  if (typeof DataBase.connection === 'undefined') {
    DataBase.init(global.config);
  }
  return DataBase.connection;
}

DataBase.init = function (config) {  
  DataBase.connection = mysql.createPool({
    debug: false,
    connectionLimit: 1,
    host: "sql6.freesqldatabase.com",
    user: "sql6702432",
    password: "njhv7HWLmb",
    database: 'sql6702432',
    timezone: '0000',
    charset : 'utf8mb4',
    // connectTimeout: Number(process.env.DB_UNOLO_CONNECT_TIMEOUT) || 10000
    connectTimeout: 30000,
    acquireTimeout: 30000,
    timeout : 30000
  });
}

DataBase.close = function () {
  try {
    if(typeof DataBase.connection !== 'undefined')
      DataBase.connection.end();
    if(typeof DataBase.zohoConnection !== 'undefined')
      DataBase.zohoConnection.end();

    DataBase.connection = undefined;
    DataBase.zohoConnection = undefined;
  } catch(e) {
    console.error("Error closing db connection");
    console.trace(e);
    throw new Error(`Error in closing db connection`);
  }
}

module.exports = DataBase;
