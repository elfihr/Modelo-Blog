const mongoose = require('mongoose')
const connectDB = async () => {

    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        //processando a dependencia env na string que esta no env
        console.log(`Database conectada ${conn.connection.host}`)
    }catch(error){
        console.log(error)
    }
}
module.exports = connectDB;//sempre exportar o modulo para poder usar