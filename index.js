const express = require('express')

const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

const port = 8080

// const authRouter = require('./src/routes/auth')
const itemsRouter = require('./src/routes/items') // (.)titik satu untuk masuk folder, (..) untuk keluar folder
const categoryRouter = require('./src/routes/category')
const cartRouter = require('./src/routes/cart')
const userRouter = require('./src/routes/user')
const colorRouter = require('./src/routes/color')

const loginRouter = require('./src/routes/login')
const registerRouter = require('./src/routes/register')

const publicRouter = require('./src/routes/public')
const customerRouter = require('./src/routes/customer/customer')
// const checkout = require('./src/routes/checkout')

// langsung panggil nama filenya, gausah .js
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// import middleware
const tokenAuth = require('./src/middlewares/auth')
// console.log(tokenAuth())

// app.use('/auth', authRouter)
app.use('/items', itemsRouter) // inisial link awal dengan /items kemudian link selanjutnya sudah ditentukan di routes
app.use('/category', categoryRouter)
app.use('/cart', tokenAuth, cartRouter)
app.use('/users', tokenAuth, userRouter)
app.use('/colors', tokenAuth, colorRouter)

app.use('/public', publicRouter)
app.use('/customer', tokenAuth, customerRouter)

app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.use('/uploads', express.static('assets/profile'))
app.use('/uploads', express.static('assets/uploads'))
/*
saya ingin memanggil gambar maka routenya harus diawali dengan /uploads
karena mengguakan static maka gambar bisa ditambiplkan di web menjadi dengan cara sebagai berikut:
http://localhost/8080/uploads(ini route kita buat diatas)/nama_file.jpg(kita ambil dari folder atau file mana(assets/profile) atau (assets/uploads))
**/

app.listen(port, () => {
  console.log('Port sedang berjalan')
})
