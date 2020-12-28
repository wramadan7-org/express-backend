const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'ecommerce'
})

conn.connect()

module.exports = conn
