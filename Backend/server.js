const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const noteRoutes = require('./routes')
require('dotenv').config()
const NoteModel = require('./Model/NoteSchema.js')
const userRoutes = require('./routes/userRoutes.js')
const cors = require('cors')

app.use(express.json())
app.use('/notes',noteRoutes);
app.use(cors());
app.use('/user',userRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.log('Error connecting to MongoDB', err)
})

app.use('/Notes', noteRoutes)

app.get('/', async (req, res) => {
  const content = await NoteModel.find()
    res.json(content)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})