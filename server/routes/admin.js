const express = require('express') 
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/user');

const adminLayout = '../views/layouts/admin';



//POST
//Checar o Login
//requisição user e passaword
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    
    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin - Pagina de Login
*/
router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: "Painel Administrativo",
      description: "Blog ADM."
    }

    res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router