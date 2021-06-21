import express from 'express'
import router from './routes.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use('/',router)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})