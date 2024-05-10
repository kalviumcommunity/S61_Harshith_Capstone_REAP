const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const noteRoutes = require('./routes')
require('dotenv').config()

app.use(express.json())

app.use('/notes', noteRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.log('Error connecting to MongoDB', err)
})