const express = require('express')//requisição do express é para criar a rota
const router = express.Router();
const Post = require('../models/Post')//Link com o Post.js

//Get
//Home
//Numero de postagens por Pagina

router.get('', async (req, res) => {
    try {
      const locals = {
        title:"BlogTest",
        description: "Just a test"
      }
  
      let perPage = 3 ;//numero de paginas
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

//Get
//=========Post:Id
//Responsavel pelos 

router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id; //resuisição dos parametros ID

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


//POST
//Post - searchTerm
//

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Seach",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")//parametro para tirar caracteres especiais na pesquisa

    const data = await Post.find({
      //pesquisa no titulo e no body
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
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
//       title: "O livro da Terra",
//       body: "Livro de varias Historias da Terra"
//     },
//     {
//       title: "Livro do Fogo",
//       body: "Historia sobre a exploração ao vulcao"
//     }

//   ])
// }
// insertPostData()