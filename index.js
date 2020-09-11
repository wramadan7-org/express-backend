const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const port = 8080

const db = require('./src/helpers/db')

const qs = require('querystring')

const itemsRouter = require('./src/routes/items') //(.)titik satu untuk masuk folder, (..) untuk keluar folder
//langsung panggil nama filenya, gausah .js

app.use(bodyParser.urlencoded({extended: false}))
app.use('/items', itemsRouter) //inisial link awal dengan /items kemudian link selanjutnya sudah ditentukan di routes

// app.post('/items', )

// app.get('/items', )

//patch walaupun data undifined tapi tetap bisa melakukan update field yg dipilih
// app.patch('/items/patch/update/:id', (req, res) => {
// 	let id = req.params.id

// 	let {name='', price='', description=''} = req.body

// 	id = parseInt(id)
// 	// price = parseInt(price)

// 	// let sql = `UPDATE items SET name = '${name}', price = ${price}, description = '${description}' WHERE id = ${id}`

// 	// db.query(sql, (err, result, fields) => {

// 		// let cek = result.affectedRows

// 		if (name.trim() || price.trim() || description.trim()) {
// 			let sql = `SELECT * FROM items WHERE id = ${id}`
// 			db.query(sql, (err, result, fields) => {
// 				if (result.length) {
// 					const data = Object.entries(req.body).map(item => {
// 						return parseInt(item[1])>0? `${item[0]}=${item[1]}`:`${item[0]}='${item[1]}'`
// 					})
// 					let sql = `UPDATE items SET ${data} WHERE id = ${id}`
// 					// console.log(sql)
// 					db.query(sql, (err, result, fields) => {
// 						console.log(result)
// 						if (result.affectedRows) {
// 							res.send({
// 								success: true,
// 								message: "Update succes",
// 								data: {
// 									...req.body
// 								}
// 							})
// 						} else {
// 							res.send({
// 								success: false,
// 								message: "Update fail"
// 							})
// 						}
// 					})
// 				} else {
// 					res.send({
// 						success: false,
// 						message: "Data not found",
// 					})
// 				}
// 			})
// 			// if (cek > 0) {
// 			// 	if (!err) {
// 			// 		res.send({
// 			// 			success: true,
// 			// 			message: "Data has been updated"
// 			// 		})
// 			// 	} else {
// 			// 		res.send({
// 			// 			success: false,
// 			// 			message: "Fail to update"
// 			// 		})
// 			// 		console.log(err)
// 			// 	}
// 			// } else {
// 			// 	res.send({
// 			// 		success: false,
// 			// 		message: "Data not found"
// 			// 	})
// 			// }
// 		} else {
// 			res.send({
// 				success: false,
// 				message: "At least fill one column"
// 			})
// 		}

		

		
// 	// })

// })

// //put kalau ada 1 field yang tidak diisi maka data tidak mau diupdate
// app.put('/items/put/update/:id', )

// app.get('/items/detail/:id', routes)

// app.delete('/items/delete/:id', (req, res) => {
// 	let id = req.params.id

// 	id = parseInt(id)

// 	let sql = `SELECT * FROM items WHERE id = ${id}`
// 	db.query(sql, (err, result, fields) => {
// 		if (result.length) {
// 			let sql = `DELETE FROM items WHERE id= ${id}`
// 			db.query(sql, (err, result, fields) => {
// 				if (result.affectedRows) {
// 					res.send({
// 						success: true,
// 						message:'Delete ${id} success',
// 						data: result
// 					})
// 				} else {
// 					res.send({
// 						success: false,
// 						message: "Delete fail"
// 					})
// 				}
// 			})
// 		} else {
// 			res.send({
// 				success: false,
// 				message: "Data not found"
// 			})
// 		}
// 	})

// 	// let sql = `DELETE FROM items WHERE id=${id}`
// 	// db.query(sql, (err, result, fields) => {

// 	// 	let cek = result.affectedRows
// 	// 	if (cek > 0) {
// 	// 		if (!err) {
// 	// 			console.log(`ID ${id} deleted`)
// 	// 			res.send("Delete success")
// 	// 		} else {

// 	// 		}
// 	// 	} else {
// 	// 		res.send("ID not found")
// 	// 	}
// 	// })
// })

app.listen(port, () => {
	console.log('Port sedang berjalan')
})