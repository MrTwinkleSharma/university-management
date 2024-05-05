var mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');

var DataBase = function () {
};

const caCertPath = path.join(__dirname, './ca.pem'); // Constructing the path to your CA certificate file
console.log(caCertPath);
DataBase.get = function () {
  if (typeof DataBase.connection === 'undefined') {
    DataBase.init(global.config);
  }
  return DataBase.connection;
}

DataBase.init = function (config) {
  DataBase.connection = mysql2.createPool({
    debug: false,
    connectionLimit: 1,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
    connectTimeout: 30000,
  });
}

DataBase.close = function () {
  try {
    if (typeof DataBase.connection !== 'undefined')
      DataBase.connection.end();
    if (typeof DataBase.zohoConnection !== 'undefined')
      DataBase.zohoConnection.end();

    DataBase.connection = undefined;
    DataBase.zohoConnection = undefined;
  } catch (e) {
    console.error("Error closing db connection");
    console.trace(e);
    throw new Error(`Error in closing db connection`);
  }
}

module.exports = DataBase;



/**
 * CREATE TABLE "admins" (
  "adminID" int NOT NULL,
  "firstName" varchar(45) NOT NULL,
  "lastName" varchar(45) NOT NULL,
  "emailID" varchar(45) NOT NULL,
  "password" varchar(45) NOT NULL,
  "mobileNumber" varchar(45) NOT NULL,
  PRIMARY KEY ("adminID")
);

CREATE TABLE "collections" (
  "collectionID" int NOT NULL,
  "studentID" varchar(45) NOT NULL,
  "amount" double NOT NULL,
  "comment" varchar(100) DEFAULT NULL,
  "timestamp" datetime NOT NULL,
  PRIMARY KEY ("collectionID")
);
CREATE TABLE "courses" (
  "courseID" int NOT NULL,
  "courseName" varchar(45) NOT NULL,
  "courseDuration" tinyint NOT NULL,
  "courseFees" double NOT NULL,
  PRIMARY KEY ("courseID")
);
CREATE TABLE "departments" (
  "departmentID" int NOT NULL,
  "departmentName" varchar(45) NOT NULL,
  "headOfDepartment" varchar(45) NOT NULL,
  PRIMARY KEY ("departmentID")
);

CREATE TABLE "faculties" (
  "facultyID" int NOT NULL,
  "firstName" varchar(45) NOT NULL,
  "lastName" varchar(45) NOT NULL,
  "dateOfBirth" date NOT NULL,
  "departmentID" varchar(45) NOT NULL,
  "mobileNumber" varchar(45) NOT NULL,
  "emailID" varchar(45) NOT NULL,
  "address" varchar(45) NOT NULL,
  "joiningDate" date NOT NULL COMMENT '		',
  "specialization" varchar(45) NOT NULL,
  PRIMARY KEY ("facultyID")
);

CREATE TABLE "students" (
  "studentID" int NOT NULL,
  "firstName" varchar(45) NOT NULL,
  "lastName" varchar(45) NOT NULL,
  "dateOfBirth" date NOT NULL,
  "courseName" varchar(45) NOT NULL,
  "mobileNumber" varchar(45) NOT NULL,
  "emailID" varchar(45) NOT NULL,
  "address" varchar(45) NOT NULL,
  "joiningDate" date NOT NULL,
  "admissionYear" date NOT NULL,
  "totalFeesCollected" double NOT NULL,
  PRIMARY KEY ("studentID")
);

 */