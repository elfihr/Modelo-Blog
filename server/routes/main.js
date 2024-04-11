const express = require('express')//requisição do express é para criar a rota
const router = express.Router();
const Post = require('../models/Post')//Link com o Post.js

//Get
//Home

router.get('', async (req, res) => {
    try {
      const locals = {
        title:"BlogTest",
        description: "Just a test"
      }
  
      let perPage = 1;//numero de paginas
      let page = req.query.page || 1;
  
      const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])//colocando -1 deixa os artigos mais antigos no top
      .skip(perPage * page - perPage)//modo para dar skip na pagina
      .limit(perPage)//limite por pagina
      .exec();
  
      //querya para ordenar posts no blog
      const count = await Post.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('index', { 
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,//condição para nextPage
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

router.get('', (req,res) => {//async para realizar a promise
    res.render('about')
})

module.exports = router;//nesecessario sempre para iniciar 


// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "O livro da Vida",
//       body: "Livro de varias Historias da vida"
//     },
//     {
//       title: "Livro do Gelo",
//       body: "Historia sobre a subida epica ao Everest"
//     }

//   ])
// }
// insertPostData()