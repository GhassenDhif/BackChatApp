const express       = require ('express')
const mongoose      =require ('mongoose')
const bodyParser    = require ('body-parser')
const morgan        = require('morgan')

const dotenv = require('dotenv')
dotenv.config()
const UserRoute = require('./routes/user')
const hostname='192.168.1.19'
const AuthRoute = require('./routes/auth')
mongoose.connect('mongodb://127.0.0.1:27017/testdb')
const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})
 
db.once('open', ()=>{   
    console.log('Database  Connection Established!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))
const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

app.use('/api/user',UserRoute)
app.use('',AuthRoute)




