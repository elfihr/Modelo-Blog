require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/db');//conecta com o db.js

const app = express()
const PORT = 5000 || process.env.PORT

//Conexao com DB(inicio da função)
connectDB()

//pesquisa com serachBar
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret: 'testeAdmin',
    resave: false,
    saveUnitialized:true,
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    })
}))

app.use(express.static('public'))//setando pasta public

//Template Engine
app.use(expressLayout)
app.set('layout', './layouts/main') //setando default layout
app.set('view engine','ejs') //Setando view engine(html,css,js)

//Rotas
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))


app.listen(PORT, () => {
    console.log(`Rodando porta ${PORT}`)
    console.log(`http://localhost:5000/`)
})