const mysql = require('mysql2')

export const mysqlPool = mysql.createPool(process.env.DATABASE_URI)