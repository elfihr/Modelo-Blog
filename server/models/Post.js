const mongoose =require('mongoose');
//estrutura das postagens
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title:{
        title:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },//criação tabela**
    createAt: {
        type:Date,
        default:Date.now
    },
    UpdateAt: {
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Post', PostSchema)