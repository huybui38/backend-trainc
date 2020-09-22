
const config = require('../config/');
const mongoose = require('mongoose');
const connectDatabase = async (postfix='') => {
    try{

        const db = await mongoose.connect(`${config.db_url}/${config.db_name}${postfix}`, {useNewUrlParser:true, useUnifiedTopology: true,authSource:'admin'})
        if (process.env.NODE_ENV !== 'production'){
            console.log('Connected to database '+config.db_url);
        }
        return db.connection;
    }catch(err){
        console.error('Mongodb starting error: ',err);
		process.exit(1);
    }
   
}
module.exports = {
    connectDatabase,
}