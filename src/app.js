import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

import loginRouter from './routes/login.routes.js'
import registroRouter from './routes/registro.routes.js'

const app = express();
const PORT = 8080
const DB_URL= 'mongodb+srv://emilianoquercia:MongoDb1986@cluster0.zfmpslu.mongodb.net/Logueo?retryWrites=true&w=majority'

app.use(express.json());

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')
app.use(express.static('public'))

const server = app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: DB_URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 15
    }),
    secret: 'codigo-s3cr3t0',
    resave: true,
    saveUninitialized: true
}))

//coneccion a mongoose
mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, (err)=>{
    if(err){
        console.log('No se puede conectar a la base de datos')
    }else{
        console.log('Mongoose conectado con Exito')
    }
})

app.use('/login', loginRouter )
app.use('/registro', registroRouter )