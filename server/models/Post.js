const mongoose = require('mongoose');
//estrutura das postagens
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },//criação tabela**
    createdAt: {
        type:Date,
        default:Date.now
    },
    UpdatedAt: {
        type:Date,
        default:Date.now
    }

    });

module.exports = mongoose.model('Post', PostSchema)