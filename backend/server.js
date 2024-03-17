const express = require('express')
const connectMongo = require("./connect")
const urlRouter = require("./routes/url.router")
const cors = require('cors')
const { handleData } = require('./routes/url.controller')
const app = express()

require('dotenv').config()

const PORT = 8000

connectMongo(process.env.MONGO_URL)

app.use(cors())
app.use(express.json())

app.use(urlRouter)

app.use('/',handleData)

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`)
})