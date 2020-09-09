const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const port = 8080

const db = require('./src/helper/db')

const qs = require('querystring')



app.use(bodyParser.urlencoded({extended: false}))

app.post('/items', (req, res) => {
	const {name, price, description} = req.body
	if (name && price && description) {
		db.query(`INSERT INTO items (name, price, description) VALUES ('${name}', ${price}, '${description}')`, (err, result, fields) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'Items has benn created',
					data: req.body
				})
			} else {
				res.status(500).send({
					success: false,
					message: 'Fail'
				})
			}
		})
	} else {
		res.status(400).send({
			success: false,
			message: "Must field"
		})
	}
})

app.get('/items', (req, res) => {

	let {page, limit, search} = req.query

	let searchKey = ''
	let searchValue = ''

	if (typeof search === 'object') {
		searchKey = Object.keys(search)[0]
		searchValue = Object.values(search)[0]
	} else {
		searchKey = 'name'
		searchValue = search||''
		console.log(search)
	}

	if(!limit) {
		limit = 5
	} else {
		limit = parseInt(limit) //kenapa di parseInt, karena inpuan bersifat string jadi jika ingin mengamil nomor, harus di ganti dgn tipedata number
	}
	if (!page) {
		page = 1
	} else {
		page = parseInt(page)
	}

	const offset = (page-1) * limit
	const sql = `SELECT * FROM items WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
	// console.log(sql)
	db.query(sql, (err, result, fields) => { //harus ada 3 parameter/callback
		if(!err) {
			const pageInfo = {
				count: 0,
				pages: 0,
				currentPage: page,
				limitPage: limit,
				nextLink: null,
				prevLink: null
			}
			if (result.length) { //kenapa result.length karena result mengembalikan array
				const sql = `SELECT COUNT (*) AS count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`
				// console.log(sql)
				db.query(sql, (err, data, fields) => {
					const {count} = data[0]
					// console.log(count)
					pageInfo.count = count
					pageInfo.pages = Math.ceil(count / limit)

					const {pages, currentPage} = pageInfo

					if (currentPage < pages) {
						pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({...req.query,...{page: page+1}})}`
					}
					if (currentPage > 1) {
						pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({...req.query,...{page: page-1}})}`
					}

					res.send({
						success: true,
						message: 'Berhasil',
						data: result,
						pageInfo
					})
				})

				
			} else {
				res.send({
					success: true,
					message: 'Data kosong',
					data: result,
					pageInfo
				})
			}
		} else {
			res.status(500).send({
				success: false,
				message: 'Internal server error'
			})
		}
	})
})

app.patch('/items/patch/update/:id', (req, res) => {
	let id = req.params.id

	let {name, price, description} = req.body

	id = parseInt(id)
	price = parseInt(price)

	let sql = `UPDATE items SET name = '${name}', price = ${price}, description = '${description}' WHERE id = ${id}`

	db.query(sql, (err, result, fields) => {

		console.log(result)

		let cek = result.affectedRows

		if (cek > 0) {
			if (!err) {
				res.send({
					success: true,
					message: "Data has been updated"
				})
			} else {
				res.send({
					success: false,
					message: "Fail to update"
				})
				console.log(err)
			}
		} else {
			res.send({
				success: false,
				message: "Data not found"
			})
		}

		
	})

})

app.get('/items/detail/:id', (req, res) => {
	let id = req.params.id

	id = parseInt(id)

	// console.log(id)

	let sql = `SELECT * FROM items WHERE id=${id}`
	db.query(sql, (err, result, fields) => {
		if (!err) {
			res.send({
				success: true,
				message: "Detail ID",
				data: result
			})
		} else {
			res.send({
				success: false,
				message: "Tidak ditemukan"
			})
		}
	})
})

app.delete('/items/:id', (req, res) => {
	let id = req.params.id

	id = parseInt(id)

	let sql = `DELETE FROM items WHERE id=${id}`
	db.query(sql, (err, result, fields) => {
		if (!err) {
			console.log(`ID ${id} telah dihapus`)
			res.send("Berhasil dihapus")
		}
	})
})

app.listen(port, () => {
	console.log('Port sedang berjalan')
})