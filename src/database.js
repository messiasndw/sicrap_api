import mongoose from 'mongoose'
import dotenv from 'dotenv' 

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION+process.env.DB_HOST+'/'+process.env.DB_DATABASE,
{useNewUrlParser: true, useUnifiedTopology: true})
// console.log(process.env.DB_CONNECTION)

const db = mongoose.connection;
db.once('open', function() {
  console.log('connected sucessfuly')
});


export default mongoose
