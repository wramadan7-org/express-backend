const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rama2000',
  database: 'ecommerce'
})

conn.connect()

module.exports = conn
