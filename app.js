require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express()
const PORT = 5000 || process.env.PORT

app.use(express.static('public'))//setando pasta public

//Template Engine
app.use(expressLayout)
app.set('layout', './layouts/main') //setando default layout
app.set('view engine','ejs') //Setando view engine(html,css,js)

app.use('/', require('./server/routes/main'))


app.listen(PORT, () => {
    console.log(`Rodando porta ${PORT}`)
    console.log(`http://localhost:5000/`)
})