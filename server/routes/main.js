const express = require('express')//requisição do express é para criar a rota
const router = express.Router();

//Rotas
router.get('', (req,res) => {
    const locals = {
        title:"BlogTest",
        description: "Just a test"
    }
    res.render('index',{locals})
})

router.get('', (req,res) => {
    res.render('about')
})

module.exports = router;//nesecessario sempre para iniciar 