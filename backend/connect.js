const mongoose = require('mongoose')

mongoose.connection.once('open',() => {
    console.log(`Connected to mongo..`)
})

mongoose.connection.on('error',() => {
    console.log(`Error during connecting to mongo`)
})

async function connectMongo(url){
    await mongoose.connect(url)
}

module.exports = connectMongo